import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit, Renderer2 } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { EventService, LoaderService, UtilityService } from '@shared/services';
import { AppFacade } from '@store/app';
import { IntegrationManagementFacade } from '@store/integration-management';
import { SystemDefaultsFacade } from '@store/system-defaults';
import { RoleFacade, UserFacade } from '@store/user';
import { UserManagementFacade } from '@store/user-management';
import { BaseLayoutComponent } from '../../../base';

@Component({
  selector: 'admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss'],
})
export class AdminLayoutComponent extends BaseLayoutComponent implements OnInit {
  defaultsLoaded$ = this.systemDefaultsFacade.defaultsLoaded$;
  clientlogo$ = this.systemDefaultsFacade.clientLogo$;
  orgType$ = this.userFacade.orgType$;

  gradientClass: string;
  isDetailsPage: boolean;

  constructor(
    public translateService: TranslateService,
    public override loaderService: LoaderService,
    public override eventService: EventService,
    public override appFacade: AppFacade,
    public override userFacade: UserFacade,
    public roleFacade: RoleFacade,
    public integrationManagementFacade: IntegrationManagementFacade,
    public userManagementFacade: UserManagementFacade,
    public override utilityService: UtilityService,
    public systemDefaultsFacade: SystemDefaultsFacade,
    private renderer2: Renderer2,
    @Inject(DOCUMENT) private document: Document,
    private router: Router
  ) {
    super(translateService, loaderService, eventService, appFacade, userFacade, utilityService);
  }

  ngOnInit(): void {
    this.subscription.add(
      this.router.events.subscribe((event) => {
        if (event instanceof NavigationEnd) {
          this.routeChangeEnded();
        }
      })
    );

    this.routeChangeEnded();

    this.init();

    this.integrationManagementFacade.init();
    this.systemDefaultsFacade.init();
    this.userManagementFacade.getUsers();
    this.roleFacade.getPermissions();
    this.renderFreshDesk();
  }

  routeChangeEnded() {
    this.gradientClass = this.computeGradientClass();
    this.isDetailsPage = this.router.url.includes('/deals/');
  }

  toggleSidebar() {
    this.appFacade.toggleSidebar(!this.isExpandedSidebar);
  }

  renderFreshDesk() {
    const script = document.createElement('script');
    script.src = 'https://widget.freshworks.com/widgets/151000004001.js';
    this.renderer2.appendChild(this.document.body, script);
  }

  computeGradientClass(): string {
    switch (true) {
      case this.router.url.includes('home'):
        return 'dashboard-color';
      case this.router.url.includes('leads'):
        return 'lead-color';
      case this.router.url.includes('quotes'):
        return 'quotes-color';
      case this.router.url.includes('credit-apps'):
        return 'credit-app-color';
      case this.router.url.includes('deals'):
        return 'deals-color';
      case this.router.url.includes('remittance'):
        return 'remittance-color';
      case this.router.url.includes('customer'):
        return 'customer-color';
      case this.router.url.includes('settings'):
        return 'sub-menu-color';
    }

    return '';
  }
}
