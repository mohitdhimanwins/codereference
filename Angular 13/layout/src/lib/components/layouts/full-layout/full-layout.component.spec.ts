import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';
import { MockUtilityService, UtilityService } from '@shared/services';
import { AppFacade, MockAppFacade } from '@store/app';
import { IntegrationManagementFacade, MockIntegrationManagementFacade } from '@store/integration-management';
import { SystemDefaultsFacade } from '@store/system-defaults';
import { MockUserFacade, UserFacade } from '@store/user';
import { FullLayoutComponent } from './full-layout.component';

describe('FullLayoutComponent', () => {
  let component: FullLayoutComponent;
  let fixture: ComponentFixture<FullLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FullLayoutComponent],
      imports: [TranslateModule.forRoot({})],
      providers: [
        { provide: SystemDefaultsFacade, useValue: { init: jest.fn() } },
        { provide: IntegrationManagementFacade, useValue: MockIntegrationManagementFacade },
        { provide: AppFacade, useValue: MockAppFacade },
        { provide: UserFacade, useValue: MockUserFacade },
        { provide: UtilityService, useValue: MockUtilityService },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FullLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
