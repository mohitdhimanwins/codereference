import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { SafeUrlPipe } from '@shared/pipes';
import { MockUtilityService, UtilityService } from '@shared/services';
import { MockRouterService } from '@shared/testing';
import { CustomerHeaderComponent } from './customer-header.component';
import { UserOrgInfoData } from '@entities';

describe('CustomerHeaderComponent', () => {
  let component: CustomerHeaderComponent;
  let fixture: ComponentFixture<CustomerHeaderComponent>;
  let router: Router;
  let utilityService: UtilityService;
  const userOrgInfo = UserOrgInfoData;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatIconModule, TranslateModule.forRoot({})],
      declarations: [CustomerHeaderComponent, SafeUrlPipe],
      providers: [
        { provide: UtilityService, useValue: MockUtilityService },
        {
          provide: Router,
          useValue: MockRouterService,
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerHeaderComponent);
    component = fixture.componentInstance;
    component.userOrgInfo = userOrgInfo;
    fixture.detectChanges();

    router = TestBed.inject(Router);
    utilityService = TestBed.inject(UtilityService);
  });

  it('should create the component', () => {
    expect(utilityService).toBeTruthy();
  });

  it('should check logout user method', () => {
    const mockWindowClose = jest.spyOn(window, 'close').mockImplementation(jest.fn());
    component.logoutUser();
    expect(mockWindowClose).toHaveBeenCalled();
  });

  it('should check open url method', () => {
    const mockWindowOpen = jest.spyOn(window, 'open').mockImplementation(jest.fn());
    component.open('/home');
    expect(mockWindowOpen).toHaveBeenCalledWith('/home', '_blank');
  });

  it('should call openContactPage method', () => {
    const navigateByUrlSpy = jest.spyOn(router, 'navigateByUrl');
    component.openContactPage();
    expect(navigateByUrlSpy).toHaveBeenCalled();
  });

  it('should detect if it is on the credit app page', () => {
    const result = component.isCreditApp;
    expect(result).toBe(false);
  });

  describe('should check isMobile get property', () => {
    it('should check the window with is less than 768 screen', () => {
      window.innerWidth = 820;
      expect(component.isMobile).toBe(false);
    });
    it('should check the window with is greater than 768 screen', () => {
      window.innerWidth = 820;
      expect(component.isMobile).toBe(false);
    });
  });

  describe('should check isTablet get property', () => {
    it('should check the window with is greater than 1199 screen', () => {
      window.innerWidth = 1199;
      expect(component.isTablet).toBe(false);
    });
  });
});
