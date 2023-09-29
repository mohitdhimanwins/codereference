import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { EventService, LoaderService, UtilityService } from '@shared/services';
import { AppFacade } from '@store/app';
import { IntegrationManagementFacade } from '@store/integration-management';
import { LenderManagementFacade } from '@store/lender-management';
import { ManualProductManagementFacade } from '@store/manual-product';
import { SystemDefaultsFacade } from '@store/system-defaults';
import { TaxesFacade } from '@store/taxes';
import { UserFacade } from '@store/user';
import { UserManagementFacade } from '@store/user-management';
import { BaseLayoutComponent } from '../../../base';

@Component({
  selector: 'main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss'],
})
export class MainLayoutComponent extends BaseLayoutComponent implements OnInit {
  dmsImport$ = this.integrationManagementFacade.isDmsEnabled$;
  clientlogo$ = this.systemDefaultsFacade.clientLogo$;
  defaultVm$ = this.systemDefaultsFacade.defaultViewModel$;
  integrationManagementViewModel$ = this.integrationManagementFacade.integrationManagementViewModel$;

  gradientClass: string;
  isDetailsPage: boolean;

  constructor(
    public translateService: TranslateService,
    public override loaderService: LoaderService,
    public override eventService: EventService,
    public override appFacade: AppFacade,
    public override userFacade: UserFacade,
    public userManagementFacade: UserManagementFacade,
    public override utilityService: UtilityService,
    public integrationManagementFacade: IntegrationManagementFacade,
    public systemDefaultsFacade: SystemDefaultsFacade,
    public taxesFacade: TaxesFacade,
    public manualProductManagementFacade: ManualProductManagementFacade,
    public lenderManagementFacade: LenderManagementFacade,
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

    this.taxesFacade.getTaxes();
    this.integrationManagementFacade.init();
    this.systemDefaultsFacade.init();
    this.userManagementFacade.getUsers();
    this.userFacade.getOrgTaxRates();
    this.manualProductManagementFacade.init();
    this.lenderManagementFacade.init();
  }

  routeChangeEnded() {
    this.gradientClass = this.computeGradientClass();
    this.isDetailsPage = this.router.url.includes('/deals/');
  }

  toggleSidebar() {
    this.appFacade.toggleSidebar(!this.isExpandedSidebar);
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

  exitImpersonation() {
    this.userFacade.exitImpersonation();
  }
}
