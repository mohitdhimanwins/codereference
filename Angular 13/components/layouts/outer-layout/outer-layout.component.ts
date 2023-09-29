import { Component, OnDestroy, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { EventService, LoaderService, UtilityService } from '@shared/services';
import { AppFacade } from '@store/app';
import { UserFacade } from '@store/user';
import { BaseLayoutComponent } from '../../../base';

@Component({
  selector: 'outer-layout',
  templateUrl: './outer-layout.component.html',
  styleUrls: ['./outer-layout.component.scss']
})
export class OuterLayoutComponent extends BaseLayoutComponent implements OnInit, OnDestroy {
  hideConsent = false;

  constructor(
    public translateService: TranslateService,
    public override loaderService: LoaderService,
    public override eventService: EventService,
    public override appFacade: AppFacade,
    public override userFacade: UserFacade,
    public override utilityService: UtilityService
  ) {
    super(translateService, loaderService, eventService, appFacade, userFacade, utilityService);
  }

  ngOnInit(): void {
    this.subscription.add(
      this.appFacade.currentRouteStateData$.subscribe((data) => {
        const { hideConsent } = data;
        this.hideConsent = hideConsent || false;
      })
    );
    this.init();
  }

  get hideCookieConsent() {
    return this.hideConsent || this.cookieConsentAccepted;

  }

}
