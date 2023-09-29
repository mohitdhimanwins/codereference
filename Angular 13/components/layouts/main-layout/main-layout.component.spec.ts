import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { TranslateModule } from '@ngx-translate/core';
import { MockUtilityService, UtilityService } from '@shared/services';
import { MockRouterService } from '@shared/testing';
import { AppFacade, MockAppFacade } from '@store/app';
import { IntegrationManagementFacade } from '@store/integration-management';
import { LenderManagementFacade, MockLenderManagementFacade } from '@store/lender-management';
import { ManualProductManagementFacade } from '@store/manual-product';
import { SystemDefaultsFacade } from '@store/system-defaults';
import { TaxManagementFacade } from '@store/tax-management';
import { MockRoleFacade, MockUserFacade, RoleFacade, UserFacade } from '@store/user';
import { MockUserManagementFacade, UserManagementFacade } from '@store/user-management';
import { MainLayoutComponent } from './main-layout.component';
import { MockTaxManagementFacade } from '@store/taxes';

describe('MainLayoutComponent', () => {
  let component: MainLayoutComponent;
  let fixture: ComponentFixture<MainLayoutComponent>;
  let appFacade: AppFacade;
  let router: Router;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MainLayoutComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [TranslateModule.forRoot({}), StoreModule.forRoot({}), StoreModule.forFeature('app', {})],
      providers: [
        { provide: AppFacade, usevalue: MockAppFacade },
        { provide: UserFacade, useValue: MockUserFacade },
        { provide: UserManagementFacade, useValue: MockUserManagementFacade },
        { provide: ManualProductManagementFacade, useValue: { init: jest.fn() } },
        { provide: IntegrationManagementFacade, useValue: { init: jest.fn() } },
        { provide: SystemDefaultsFacade, useValue: { init: jest.fn() } },
        { provide: LenderManagementFacade, useValue: MockLenderManagementFacade },
        { provide: RoleFacade, useValue: MockRoleFacade },
        { provide: TaxManagementFacade, useValue: MockTaxManagementFacade },
        { provide: Router, useValue: MockRouterService },
        { provide: UtilityService, useValue: MockUtilityService },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    appFacade = TestBed.inject(AppFacade);
    router = TestBed.inject(Router);
  });

  it('should create', () => {
    expect(router).toBeTruthy();
  });

  it('should handle toggleSidebarr', () => {
    const mockFacadeMethod = jest.spyOn(appFacade, 'toggleSidebar');
    component.toggleSidebar();
    expect(mockFacadeMethod).toHaveBeenCalledWith(!component.isExpandedSidebar);
  });
});
