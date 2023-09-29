import { Component, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { EventService, LoaderService, UtilityService } from '@shared/services';
import { AppFacade } from '@store/app';
import { BaseCustomerLayoutComponent } from '../../../base';
import { UserFacade } from '@store/user';

@Component({
  selector: 'customer-layout',
  templateUrl: './customer-layout.component.html',
  styleUrls: ['./customer-layout.component.scss'],
})
export class CustomerLayoutComponent extends BaseCustomerLayoutComponent implements OnInit, OnDestroy {
  hideHeader: boolean;
  fullLayout: boolean;

  vm$ = this.userFacade.userOrgInfo$;
  linkConfigItems$ = this.appFacade.linkConfigItems$;

  constructor(
    public override title: Title,
    public translateService: TranslateService,
    public override utilityService: UtilityService,
    public override loaderService: LoaderService,
    public override appFacade: AppFacade,
    public override userFacade: UserFacade,
    public router: Router,
    public route: ActivatedRoute,
    public eventService: EventService
  ) {
    super(title, translateService, loaderService, utilityService, appFacade, userFacade);
  }

  ngOnInit(): void {
    this.subscription.add(
      this.appFacade.currentRouteStateData$.subscribe((data) => {
        const { hideHeader } = data;
        this.hideHeader = hideHeader || false;
        this.fullLayout = this.hideHeader;
      })
    );

    this.init();
  }
  

}
