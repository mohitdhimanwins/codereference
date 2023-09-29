import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TranslateModule } from '@ngx-translate/core';
import { MockFormMethods } from '@shared/testing';
import { MockUserFacade, UserFacade } from '@store/user';
import { NgxMaskModule } from 'ngx-mask';
import { UpdateProfileDialogComponent } from './update-profile-dialog.component';
import { MockConfigLinkPipe } from '@shared/pipes';
import { MockDialogService } from '@shared/services';

describe('UpdateProfileDialogComponent', () => {
  let component: UpdateProfileDialogComponent;
  let fixture: ComponentFixture<UpdateProfileDialogComponent>;
  let dialogRef: MatDialogRef<UpdateProfileDialogComponent>;
  let userFacade: UserFacade;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        UpdateProfileDialogComponent,
        MockConfigLinkPipe
      ],
      imports: [
        TranslateModule.forRoot({}),
        FormsModule,
        NgxMaskModule.forRoot(),
      ],
      providers: [
        { provide: UserFacade, useValue: MockUserFacade }, 
        { provide: MatDialogRef, useValue: MockDialogService }, 
        { provide: MAT_DIALOG_DATA, useValue: {} }],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });
  
  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateProfileDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    dialogRef = TestBed.inject(MatDialogRef);
    userFacade = TestBed.inject(UserFacade);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should return false if isSamePhoneNumber are not dirty', () => {
    component.profile = MockFormMethods;
    const isDirty = component.isSamePhoneNumber;
    expect(isDirty).toBe(false);
  });
  it('should return false if isOtpFieldValid are not dirty', () => {
    component.profile = MockFormMethods;
    const isDirty = component.isOtpFieldValid;
    expect(isDirty).toBe(undefined);
  });
  it('should return false if isPhoneFieldValid are not dirty', () => {
    component.profile = MockFormMethods;
    const isDirty = component.isPhoneFieldValid;
    expect(isDirty).toBe(false);
  });

  it('should handle submit', () => {
    component.form.control.markAsDirty();
    component.submit();
  });
  it('initializeForm Method is called', () => {
    jest.spyOn(component, 'initializeForm');
    component.initializeForm();
    expect(component.initializeForm).toHaveBeenCalled();
  });

  it('should call UserFacade.updateProfile() when form is dirty', () => {
    const formValues: any = {
      userId: null,
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      mobilePhone: '1234567890',
    };
    component.profile = formValues;
    component.form.control.markAsDirty();
    component.submit();
  });

  it('should close the dialog when form is not dirty', () => {
    component.form.control.markAsPristine();
    const mockClose = jest.spyOn(dialogRef, 'close');
    component.submit();

    expect(mockClose).toHaveBeenCalled();
  });

  it('should unsubscribe from the subscription on ngOnDestroy', () => {
    const mockSubscription = jest.spyOn(component.subscription, 'unsubscribe');
    component.ngOnDestroy();
    expect(mockSubscription).toHaveBeenCalled();
  });

  it('should handle sentOtp ', () => {
    const mockSpy = jest.spyOn(userFacade, 'sentOtp');
    component.sendOtp();
    expect(mockSpy).toHaveBeenCalled();
  });

  it('should handle changePhone ', () => {
    const mockSpy = jest.spyOn(userFacade, 'resetSentOtpEvent');
    component.changePhone();
    expect(mockSpy).toHaveBeenCalled();
  });
});
