import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AdminPermission, FeatureFlag, Permission } from '@entities';

import { DashboardFacade, PermissionService } from '@store/user';
import { MenuItem } from '../models';
import { Sidebar } from '../enums';

@Injectable()
export class NavigationService {
  private readonly dealerMenuItems: MenuItem[] = [
    {
      icon: 'home',
      title: 'sidebar.menu.home',
      route: '/home',
      class: 'dashboard-color',
      entityType: Sidebar.Home,
    },
    {
      children: [
        {
          title: 'sidebar.menu.leads',
          route: '/leads',
          class: 'indicator-element lead-color',
          entityKey: 'leadsCount',
          entityType: Sidebar.Leads,
          requiredFeatureFlag: FeatureFlag.LeadsEnabled,
          requiredPermission: Permission.ViewLeads,
          data$: this.dashboardFacade.leadsCount$,
        },

        {
          title: 'sidebar.menu.quotes',
          route: '/quotes',
          class: 'indicator-element quotes-color',
          entityKey: 'quotesCount',
          requiredFeatureFlag: FeatureFlag.QuotesEnabled,
          entityType: Sidebar.Quotes,
          requiredPermission: Permission.ViewQuotes,
          data$: this.dashboardFacade.quotesCount$,
        },
        {
          title: 'sidebar.menu.creditApp',
          route: '/credit-apps',
          class: 'indicator-element credit-app-color',
          entityKey: 'creditAppsCount',
          entityType: Sidebar.CreditApps,
          requiredFeatureFlag: FeatureFlag.CreditAppsEnabled,
          requiredPermission: Permission.ViewCreditApps,
          data$: this.dashboardFacade.creditAppsCount$,
        },
        {
          title: 'sidebar.menu.deals',
          route: '/deals',
          class: 'indicator-element deals-color',
          entityKey: 'dealsCount',
          entityType: Sidebar.Deals,
          requiredPermission: Permission.ViewDeals,
          data$: this.dashboardFacade.dealsCount$,
        },
        {
          title: 'sidebar.menu.remittance',
          route: '/remittance',
          class: 'indicator-element remittance-color',
          entityKey: 'remittanceCount',
          entityType: Sidebar.Remittance,
          requiredPermission: Permission.ViewProductsRemittance,
          data$: this.dashboardFacade.remittanceCount$,
        },
      ],
    },
    {
      icon: 'group',
      title: 'sidebar.menu.customers',
      route: '/customers',
      class: 'customer-color',
      entityType: Sidebar.Customers,
      requiredPermission: Permission.ViewCustomers,
    },
    {
      icon: 'settings',
      title: 'sidebar.menu.settings',
      isExpanded: false,
      children: [
        {
          requiredPermission: Permission.ViewUsers,
          title: 'sidebar.menu.users',
          class: 'sub-menu-color',
          route: '/settings/users',
        },
        {
          requiredPermission: Permission.ViewRoles,
          title: 'sidebar.menu.roles',
          class: 'sub-menu-color',
          route: '/settings/roles',
        },
        {
          requiredPermission: Permission.ViewLocations,
          title: 'sidebar.menu.locations',
          class: 'sub-menu-color',
          route: '/settings/locations',
        },
        {
          title: 'sidebar.menu.taxProfile',
          route: '/settings/tax-profiles',
          class: 'sub-menu-color',
          requiredPermission: Permission.ViewTaxProfile,
        },
        {
          title: 'sidebar.menu.products',
          isExpanded: false,
          class: 'settings-color',
          children: [
            {
              title: 'sidebar.menu.protectionProducts',
              route: '/settings/products/rated',
              class: 'sub-menu-color',
              requiredPermission: Permission.ViewProductsConfig,
            },
            {
              title: 'sidebar.menu.manualProducts',
              route: '/settings/products/manual-products',
              class: 'sub-menu-color',
              requiredPermission: Permission.ViewProductsConfig,
            },
            {
              title: 'sidebar.menu.menuColumns',
              route: '/settings/products/menu',
              class: 'sub-menu-color',
              requiredFeatureFlag: FeatureFlag.MenuEnabled,
              requiredPermission: Permission.ViewProductsConfig,
            },
            {
              title: 'sidebar.menu.taxes',
              route: '/settings/products/taxes',
              class: 'sub-menu-color',
              requiredPermission: Permission.ViewProductsConfig,
            },
          ],
        },

        {
          requiredPermission: Permission.ViewSysDefaults,
          title: 'sidebar.menu.defaults',
          class: 'sub-menu-color',
          route: '/settings/system-defaults',
        },
        {
          requiredPermission: Permission.ViewIntegrations,
          title: 'sidebar.menu.integrations',
          class: 'sub-menu-color',
          route: '/settings/integrations',
        },
        {
          
          requiredPermission: Permission.ViewNotifications,
          title: 'sidebar.menu.notifications',
          class: 'sub-menu-color ',
          route: '/settings/notifications',
        },
        {
          requiredPermission: Permission.ViewLenders,
          title: 'sidebar.menu.lenders',
          class: 'sub-menu-color',
          route: '/settings/lenders',
        },
      ],
    },
  ];

  private readonly adminMenuItems: MenuItem[] = [
    {
      icon: 'home',
      title: 'sidebar.adminMenu.home',
      route: '/home',
    },
    {
      icon: 'location_on',
      title: 'sidebar.adminMenu.organizations',
      route: '/orgs',
      requiredPermission: AdminPermission.ViewOrgs,
    },
    {
      icon: 'group',
      title: 'sidebar.adminMenu.uniqueUsers',
      route: '/unique-users',
      requiredPermission: AdminPermission.ViewUniqueUsers,
    },
    {
      icon: 'settings',
      title: 'sidebar.adminMenu.users',
      route: '/users',
      requiredPermission: AdminPermission.ViewUsers,
    },
  ];

  constructor(private router: Router, private permissionService: PermissionService, private dashboardFacade: DashboardFacade) {}

  buildUserMenuItems(adminMode = false) {
    if (adminMode) return this.buildMenu(this.adminMenuItems);

    return this.buildMenu(this.dealerMenuItems);
  }

  buildMenu(menuItems: MenuItem[]) {
    const userMenuItems: MenuItem[] = [];
    for (const menuItem of menuItems) {
      const subMenuItems: MenuItem[] = menuItem?.children || [];

      // Handle If Menu has no sub items
      if (subMenuItems.length == 0) {
        const isMenuItemAcessible = this.permissionService.checkFeatureAvailablity(menuItem);
        if (isMenuItemAcessible) userMenuItems.push(menuItem);
      } else {
        // Handle If Menu has sub items
        menuItem.isExpanded = this.checkMenuIsActive(menuItem);
        const availableSubMenuItems = this.buildMenu(subMenuItems);

        if (availableSubMenuItems.length > 0) userMenuItems.push({ ...menuItem, children: availableSubMenuItems });
      }
    }

    return userMenuItems;
  }

  checkMenuIsActive(menuItem: MenuItem) {
    const subMenuItems = menuItem.children || [];
    if (subMenuItems?.length == 0) return this.isRouteActive(menuItem.route);

    let hasParentActive = false;
    for (const item of subMenuItems) {
      const isMenuActive = this.checkMenuIsActive(item);
      if (isMenuActive) {
        hasParentActive = true;
        break;
      }
    }

    return hasParentActive;
  }

  isRouteActive(route?: string) {
    if (!route) return false;
    const currentRoute = this.router.url.split('?')[0];
    return currentRoute.startsWith(route || '');
  }
}
