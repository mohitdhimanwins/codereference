import { HubConnection } from '@microsoft/signalr';
import { ApiGatewayPath, HubEndpoints } from '@base';
import { DealStageType, NotificationTopic } from '@entities';
import { EventService, SignalrService } from '@shared/services';
import { AppSettings } from '@shared/utils';
import { DashboardFacade, UserFacade } from '@store/user';
import { Subscription } from 'rxjs';

export interface Notification {
  topic: NotificationTopic;
}

export abstract class BaseNavigationComponent {
  private subscription = new Subscription();
  hubConnections: { number?: HubConnection } = {};
  orgId: number;

  constructor(public signalrService: SignalrService, public userFacade: UserFacade, public eventService: EventService, public dashboardFacade: DashboardFacade) {
    this.subscription.add(this.userFacade.currentOrgId$.subscribe((orgId) => (this.orgId = orgId)));
  }

  // Need to call this function on page load.
  public realTimeSubscriptions() {
    // Customer Notification Subscriptions
    const customerHubUrl = `${AppSettings.baseApiUrl}/${ApiGatewayPath.customers}/${HubEndpoints.customers.views}`;
    const customerTopic = NotificationTopic.CustomerUpdated;

    this.entityRealTimeSubscription(customerHubUrl, customerTopic);

    // CreditApps Notification Subscriptions
    const creditAppHubUrl = `${AppSettings.baseApiUrl}/${ApiGatewayPath.creditapps}/${HubEndpoints.creditApp.views}`;
    const creditAppTopic = NotificationTopic.CreditAppUpdated;

    this.entityRealTimeSubscription(creditAppHubUrl, creditAppTopic);

    // Deals Notification Subscriptions
    const dealAppHubUrl = `${AppSettings.baseApiUrl}/${ApiGatewayPath.deals}/${HubEndpoints.deals.views}`;
    const dealTopic = NotificationTopic.DealUpdated;

    this.entityRealTimeSubscription(dealAppHubUrl, dealTopic);

    // Remittance Notification Subscriptions
    const remittanceHubUrl = `${AppSettings.baseApiUrl}/${ApiGatewayPath.products}/${HubEndpoints.remittance.views}`;
    const remittanceTopic: NotificationTopic = NotificationTopic.ContractUpdated;

    this.entityRealTimeSubscription(remittanceHubUrl, remittanceTopic);
  }

  // Need to call this function on page load.
  private entityRealTimeSubscription(hubUrl: string, topic: NotificationTopic) {
    this.hubConnections[topic] = this.signalrService.build(hubUrl);

    this.subscription.add(
      this.hubConnections[topic].onreconnected(() => {
        this.registerSingalrEvents(topic);
      })
    );

    this.signalrService.startConnection(this.hubConnections[topic]).then(() => {
      this.registerSingalrEvents(topic);
    });
  }

  private registerSingalrEvents(topic: NotificationTopic) {
    // Invoke event
    this.signalrService.invokeWithParams(this.hubConnections[topic], 'Subscribe', +this.orgId);

    this.subscription.add(
      this.signalrService.on(this.hubConnections[topic], topic).subscribe({
        next: (resp: any) => {
          switch (topic) {
            case NotificationTopic.CustomerUpdated:
              this.getLeadsCount();
              break;
            case NotificationTopic.CreditAppUpdated:
              this.getCreditAppsCount();
              break;
            case NotificationTopic.DealUpdated:
              resp.payload.dealStage === DealStageType.Deal ? this.getDealsCount() : this.getQuotesCount();
              break;
            case NotificationTopic.ContractUpdated:
              this.getRemittanceCount();
              break;
          }
          this.eventService.realTimeDataObservable.next({ ...resp, topic });
        },
        error: (error) => {
          window.console.error('On Method Error', error.toString());
        },
      })
    );
  }

  getLeadsCount() {
    this.dashboardFacade.getLeadsCount();
  }

  getQuotesCount() {
    this.dashboardFacade.getQuotesCount();
  }

  getCreditAppsCount() {
    this.dashboardFacade.getCreditAppsCount();
  }

  getDealsCount() {
    this.dashboardFacade.getDealsCount();
  }

  getRemittanceCount() {
    this.dashboardFacade.getRemittanceCount();
  }

  destroy(): void {
    for (const connection in this.hubConnections) {
      if (this.hubConnections[connection]) this.signalrService.stopConnection(this.hubConnections[connection]);
    }
    this.subscription.unsubscribe();
  }
}
