import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { EventService, LoaderService, UtilityService } from '@shared/services';
import { AppFacade } from '@store/app';
import { SystemDefaultsFacade } from '@store/system-defaults';
import { UserFacade } from '@store/user';
import { BaseLayoutComponent } from '../../../base';
import { IntegrationManagementFacade } from '@store/integration-management';

@Component({
  selector: 'full-layout',
  templateUrl: './full-layout.component.html',
  styleUrls: ['./full-layout.component.scss']
})
export class FullLayoutComponent extends BaseLayoutComponent implements OnInit {
  fullWidth: boolean;
  hideMainFooter = true;

  constructor(
    public translateService: TranslateService,
    public override loaderService: LoaderService,
    public override eventService: EventService,
    public override appFacade: AppFacade,
    public override userFacade: UserFacade,
    public override utilityService: UtilityService,
    public systemDefaultsFacade: SystemDefaultsFacade,
    public integrationManagementFacade: IntegrationManagementFacade,
  ) {
    super(translateService, loaderService, eventService, appFacade, userFacade, utilityService);
  }

  ngOnInit(): void {
    if(window.location.pathname.split('/')[1] == 'quotes'){
      this.hideMainFooter = false;
    }
    this.subscription.add(
      this.appFacade.currentRouteStateData$.subscribe((data) => {
        const { fullWidth } = data;
        this.fullWidth= fullWidth || false;
      })
    );


    this.init();
    this.systemDefaultsFacade.init();
    this.integrationManagementFacade.init();
    this.userFacade.getOrgTaxRates();
  }

}
