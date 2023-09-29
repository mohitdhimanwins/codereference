import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { MockUtilityService, UtilityService } from '@shared/services';
import { MockRouterService } from '@shared/testing';
import { AppFacade, MockAppFacade } from '@store/app';
import { IntegrationManagementFacade, MockIntegrationManagementFacade } from '@store/integration-management';
import { SystemDefaultsFacade } from '@store/system-defaults';
import { MockRoleFacade, MockUserFacade, RoleFacade, UserFacade } from '@store/user';
import { MockUserManagementFacade, UserManagementFacade } from '@store/user-management';
import { AdminLayoutComponent } from './admin-layout.component';

describe('AdminLayoutComponent', () => {
  let component: AdminLayoutComponent;
  let fixture: ComponentFixture<AdminLayoutComponent>;
  let appFacade: AppFacade;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminLayoutComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [
        TranslateModule.forRoot({}), 
      ],
      providers: [
        { provide: AppFacade, useValue: MockAppFacade }, 
        { provide: UserFacade, useValue: MockUserFacade }, 
        { provide: UserManagementFacade, useValue: MockUserManagementFacade},
        { provide: IntegrationManagementFacade, useValue: MockIntegrationManagementFacade},
        { provide: SystemDefaultsFacade, useValue: {init: jest.fn()}},
        { provide: RoleFacade, useValue: MockRoleFacade },
        { provide: Router, useValue: MockRouterService },
        { provide: UtilityService, useValue: MockUtilityService },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    appFacade = TestBed.inject(AppFacade);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should handle toggleSidebarr', () => {
    const mockFacadeMethod = jest.spyOn(appFacade, 'toggleSidebar');
    component.toggleSidebar();
    expect(mockFacadeMethod).toHaveBeenCalledWith(!component.isExpandedSidebar);
  });
});
