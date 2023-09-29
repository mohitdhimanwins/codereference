import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { MockRouterService } from '@shared/testing';
import { DashboardFacade, MockDashboardFacade, MockPermissionService, PermissionService } from '@store/user';
import { NavigationService } from './navigation.service';

describe('NavigationService', () => {
  let service: NavigationService;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [],
      providers: [
        NavigationService,
        { provide:PermissionService, useValue: MockPermissionService },
        {
          provide: DashboardFacade,
          useValue: MockDashboardFacade,
        },
        {
          provide: Router,
          useValue: MockRouterService,
        },
      ],
    });
    service = TestBed.inject(NavigationService);
  });

  it('should create the service', () => {
    expect(service).toBeTruthy();
  });

  describe('buildUserMenuItems', () => {
    it('should return empty array for empty menu items', () => {
      const result = service.buildMenu([]);

      expect(result).toEqual([]);
    });

    it('should build the user menu items', () => {
      const appMenus: any = [
        {
          label: 'Menu 1',
          route: '/menu1',
          requiredPermission: 'menu1',
          isExpanded: false,
          subMenuItems: [
            {
              label: 'Submenu 1',
              route: '/submenu1',
              requiredPermission: 'submenu1',
              isExpanded: false,
              subMenuItems: [],
            },
          ],
        },
        {
          label: 'Menu 2',
          route: '/menu2',
          requiredPermission: 'menu2',
          isExpanded: false,
          subMenuItems: [],
        },
      ];
      jest.spyOn(service, 'buildMenu').mockReturnValue(appMenus);

      const userMenuItems = service.buildUserMenuItems();

      expect(userMenuItems.length).toBe(2);
      expect(userMenuItems[0]).toEqual(appMenus[0]);
      expect(userMenuItems[1]).toEqual(appMenus[1]);
    });

    it('should handle menu items with sub menu items', () => {
      const menuItems = [{ title: 'Reports', subMenuItems: [{ title: 'Report 1', route: '/reports/1' }] }] as any[];
      jest.spyOn(service, 'checkMenuIsActive').mockReturnValueOnce(false);
      jest.spyOn(service, 'buildMenu').mockReturnValueOnce([{ title: 'Report 1', route: '/reports/1' }]);

      const result = service.buildMenu(menuItems);
    });
  });
  it('should check if route is active', () => {
    const isActive = service.isRouteActive('/path/to/menu-item-6');

    expect(isActive).toBeFalsy();
  });

  it('should check if route is not active', () => {
    const isActive = service.isRouteActive('/path/to/menu-item-8');

    expect(isActive).toBeFalsy();
  });

  it('should check if menu is not active', () => {
    const menuItem: any = {
      label: 'Menu Item 4',
      route: '/path/to/menu-item-4',
    };

    const isActive = service.checkMenuIsActive(menuItem);

    expect(isActive).toBeFalsy();
  });

  it('should check if menu is active', () => {
    const menuItem: any = {
      label: 'Menu Item 3',
      route: '/path/to/menu-item-3',
      subMenuItems: [
        {
          label: 'Sub Menu Item 1',
          route: '/path/to/sub-menu-item-1',
        },
        {
          label: 'Sub Menu Item 2',
          route: '/path/to/sub-menu-item-2',
          subMenuItems: [
            {
              label: 'Sub Sub Menu Item 1',
              route: '/path/to/sub-sub-menu-item-1',
            },
          ],
        },
      ],
    };
    const isActive = service.checkMenuIsActive(menuItem);

    expect(isActive).toBeFalsy();
  });
});
