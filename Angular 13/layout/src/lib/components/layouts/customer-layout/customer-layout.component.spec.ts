import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { TranslateModule } from '@ngx-translate/core';
import { MockUtilityService, UtilityService } from '@shared/services';
import { MockRouterService } from '@shared/testing';
import { AppFacade, appReducer, MockAppFacade } from '@store/app';
import { MockUserFacade, UserFacade } from '@store/user';
import { CustomerLayoutComponent } from './customer-layout.component';
describe('CustomerLayoutComponent', () => {
  let component: CustomerLayoutComponent;
  let fixture: ComponentFixture<CustomerLayoutComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CustomerLayoutComponent],
      imports: [
        StoreModule.forRoot({ app: appReducer }), 
        TranslateModule.forRoot({}), 
      ],
      providers: [
        { provide: AppFacade, useValue: MockAppFacade }, 
        { provide: UserFacade, useValue: MockUserFacade }, 
        { provide: UtilityService, useValue: MockUtilityService },
        { provide: Router, useValue: MockRouterService },
        { provide: ActivatedRoute, useValue: {} }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
