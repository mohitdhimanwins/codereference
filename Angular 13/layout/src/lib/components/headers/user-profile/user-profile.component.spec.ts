import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { By } from '@angular/platform-browser';
import { TranslateModule } from '@ngx-translate/core';
import { MfaVerificationDialogComponent, SwitchLocationDialogComponent } from '@shared/components';
import { ShortNamePipe } from '@shared/pipes';
import { EventService, MockDialogService, MockEventService, ModalService } from '@shared/services';
import { UserProfileComponent } from './user-profile.component';

describe('UserProfileComponent', () => {
  let component: UserProfileComponent;
  let fixture: ComponentFixture<UserProfileComponent>;
  let eventService: EventService;
  let modalService: ModalService;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserProfileComponent, ShortNamePipe],
      imports: [MatMenuModule, TranslateModule.forRoot(), MatTooltipModule],
      providers: [
        {
          provide: EventService,
          useValue: MockEventService,
        },
        {
          provide: ModalService,
          useValue: MockDialogService,
        },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserProfileComponent);
    component = fixture.componentInstance;
    component.isEnableMFA = true;
    const user = { firstName: 'John', lastName: 'Doe' };
    const userName = user.firstName + ' ' + user.lastName;
    component.user = { ...component.user, ...user, userName, mobilePhone: '(123) 456-5678' };
    fixture.detectChanges();

    eventService = TestBed.inject(EventService);
    modalService = TestBed.inject(ModalService);
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call the reset password method on resetPassword', () => {
    const mockSpyEvent = jest.spyOn(eventService.resetPasswordObservable, 'next');
    component.resetPassword();
    expect(mockSpyEvent).toHaveBeenCalled();
  });

  it('should call the logout user method on logoutUser', () => {
    jest.spyOn(eventService.logoutObservable, 'next');
    component.logoutUser();
    expect(eventService.logoutObservable.next).toHaveBeenCalledWith(null);
  });
  it('should open the switch location modal on changeLocation', () => {
    const mockServiceMethod = jest.spyOn(modalService, 'open');
    component.changeLocation();
    expect(mockServiceMethod).toHaveBeenCalledWith(SwitchLocationDialogComponent, component.user, 'modal-sm');
  });
  it('should open the update profile modal on dialogMFAProfile', () => {
    const mockServiceMethod = jest.spyOn(modalService, 'open');
    component.dialogMFAProfile();
    expect(mockServiceMethod).toHaveBeenCalledWith(MfaVerificationDialogComponent, component.user, 'modal-xs');
  });
  it('should unsubscribe from the subscription on ngOnDestroy', () => {
    const mockSubscription = jest.spyOn(component.subscription, 'unsubscribe');
    component.ngOnDestroy();
    expect(mockSubscription).toHaveBeenCalled();
  });

  it('should display the full name of the user', () => {
    const nameElement = fixture.debugElement.query(By.css('.profileName'));
    expect(nameElement.childNodes[0].nativeNode.textContent).toContain(component.user.userName);
  });
});
