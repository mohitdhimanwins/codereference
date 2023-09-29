import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Component, Directive } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ServicesModule } from '@shared/services';
import { UserManagementFacade } from '@store/user-management';
import { PermissionIfDirective } from './permission-if.directive';
import { AppPermission } from '../enums';
import { MockUserFacade, PermissionService, UserFacade } from '@store/user';


@Component({
  template: `
    <ng-template [permissionIf]="permission">
      <div>Content that requires permission</div>
    </ng-template>
  `,
})
class TestComponent {
  permission: AppPermission;
}
describe('PermissionIfDirective', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;
  let permissionService: PermissionService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PermissionIfDirective, TestComponent],
      providers: [PermissionService, UserManagementFacade, { provide: UserFacade, useValue: MockUserFacade }],
      imports: [HttpClientTestingModule, ServicesModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    permissionService = TestBed.inject(PermissionService);
    jest.spyOn(permissionService, 'permissionIsGranted');
  });

  it('should create an instance', () => {
    expect(Directive).toBeTruthy();
  });

  it('should render content if permission is granted', () => {
    let permission: AppPermission;
    const testComponent = fixture.componentInstance;
    testComponent.permission = permission;
    jest.spyOn(permissionService, 'permissionIsGranted').mockReturnValue(true);

    fixture.detectChanges();
  });

  it('should not render content if permission is not granted', () => {
    let permission: AppPermission;
    const testComponent = fixture.componentInstance;
    testComponent.permission = permission;
    jest.spyOn(permissionService, 'permissionIsGranted').mockReturnValue(false);

    fixture.detectChanges();
  });
});
