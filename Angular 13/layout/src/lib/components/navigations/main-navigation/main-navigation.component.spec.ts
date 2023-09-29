import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TranslateModule } from '@ngx-translate/core';
import { Permission } from '@entities';
import { MockUtilityService, ServicesModule, UtilityService } from '@shared/services';
import { DashboardFacade, MockDashboardFacade, MockUserFacade, UserFacade } from '@store/user';
import { Sidebar } from '../../../enums';
import { MenuItem } from '../../../models';
import { NavigationService } from '../../../services';
import { MainNavigationComponent } from './main-navigation.component';
describe('MainNavigationComponent', () => {
  let component: MainNavigationComponent;
  let fixture: ComponentFixture<MainNavigationComponent>;
  let navigationService: NavigationService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MainNavigationComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [TranslateModule.forRoot({}), MatTooltipModule, ServicesModule],
      providers: [
        {
          provide: NavigationService,
          useValue: {
            buildUserMenuItems: jest.fn(),
            checkMenuIsActive: jest.fn().mockReturnValue(false),
            currentActiveRoute: jest.fn(),
          },
        },
        { provide: UtilityService, useValue: MockUtilityService },
        { provide: DashboardFacade, useValue: MockDashboardFacade },
        { provide: UserFacade, useValue: MockUserFacade },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    navigationService = TestBed.inject(NavigationService);
  });
  it('should be create', () => {
    expect(component).toBeTruthy();
  });

  it('should check build menu function on ngOnIt', () => {
    const mockMethod = jest.spyOn(navigationService, 'buildUserMenuItems');
    component.buildMenuItems();
    expect(mockMethod).toHaveBeenCalled();
    expect(component.menuItems).toEqual(undefined);
  });

  it('should check toggle sidebar', () => {
    const mockEmit = jest.spyOn(component.toggle, 'emit');
    component.toggleSidebar();
    expect(mockEmit).toHaveBeenCalled();
  });
  it('should check checkIfMenuIsActive', () => {
    const item: MenuItem = { title: 'Home' };
    const result = component.checkIfMenuIsActive(item);
    expect(result).toBe(false);
  });
  describe('should handle dropdownClicked method', () => {
    const menuItem: MenuItem = {
      title: 'A',
      route: 'M',
      icon: 'text.icon',
      isExpanded: false,
      requiredPermission: Permission.UpdateDeal,
    };
    it('should check with isExpended true value', () => {
      component.dropdownClicked(menuItem, event);
      expect(menuItem.isExpanded).toBe(true);
    });
    it('should handle dropdownClicked with collapsed false value', () => {
      menuItem.isExpanded = true;
      component.dropdownClicked(menuItem, event);
      expect(menuItem.isExpanded).toBe(false);
    });
  });

  it('should handle hideMenuName called', () => {
    expect(component.hideMenuName(Sidebar.Home)).toBe(true);
  });

  it('should check refreshRoute get property', () => {
    expect(component.refreshRoute).toBe(false);
  });

  afterEach(() => {
    fixture.destroy();
  });
});
