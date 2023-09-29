import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { EventService, SignalrService, UtilityService } from '@shared/services';
import { DashboardFacade, UserFacade } from '@store/user';
import { NavigationService } from '../../../services';
import { BaseNavigationComponent } from '../base-navigation.component';
import { MenuItem } from '../../../models';
import { Sidebar } from '../../../enums';

@Component({
  selector: 'main-navigation',
  templateUrl: './main-navigation.component.html',
  styleUrls: ['./main-navigation.component.scss'],
})
export class MainNavigationComponent extends BaseNavigationComponent implements OnInit, OnDestroy {
  @Input() expanded: boolean;
  @Input() tooltipText: string;
  @Input() gradientClass: string;
  @Output() toggle = new EventEmitter();

  menuItems: MenuItem[];
  isToggle = false;

  constructor(
    private navigationService: NavigationService,
    public override userFacade: UserFacade,
    private utilityService: UtilityService,
    public override signalrService: SignalrService,
    public override eventService: EventService,
    public override dashboardFacade: DashboardFacade
  ) {
    super(signalrService, userFacade, eventService, dashboardFacade);
  }

  ngOnInit(): void {
    this.buildMenuItems();

    // side nav count
    this.getLeadsCount();
    this.getQuotesCount();
    this.getCreditAppsCount();
    this.getDealsCount();
    this.getRemittanceCount();
    this.realTimeSubscriptions();
  }

  toggleSidebar() {
    this.isToggle = !this.isToggle;
    this.toggle.emit();
  }

  checkIfMenuIsActive(menuItem: MenuItem) {
    const isMenuActive = this.navigationService.checkMenuIsActive(menuItem);
    return isMenuActive;
  }

  buildMenuItems() {
    this.menuItems = this.navigationService.buildUserMenuItems();
  }

  dropdownClicked(menuItem: MenuItem, event: Event) {
    event?.stopPropagation();
    menuItem.isExpanded = !menuItem.isExpanded;
  }

  hideMenuName(entityType) {
    return entityType === Sidebar.Home || entityType === Sidebar.Customers;
  }

  get refreshRoute() {
    return this.utilityService.hasRefreshInCurrentRoute();
  }

  ngOnDestroy(): void {
    this.destroy();
  }
}
