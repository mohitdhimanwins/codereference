import { Component, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BaseDialogComponent } from '@base';
import { ConfigLink, User } from '@entities';
import { MobileVerificationRequest, ProfileRequestModel, UserFacade } from '@store/user';
import { MaskPipe } from 'ngx-mask';

@Component({
  selector: 'update-profile-dialog',
  templateUrl: './update-profile-dialog.component.html',
  styleUrls: ['./update-profile-dialog.component.scss'],
  providers: [MaskPipe],
})
export class UpdateProfileDialogComponent extends BaseDialogComponent implements OnInit, OnDestroy {
  disabledPhone = true;
  previousMobilePhone: string;
  profile: ProfileRequestModel = {
    userId: null,
    firstName: null,
    lastName: null,
    email: null,
    mobilePhone: null,
    otp: null,
  };

  isOtpSent$ = this.userFacade.isOtpSent$;
  @ViewChild('form', { static: true }) override form: NgForm;

  readonly termsOfUseLink = ConfigLink.TermsOfUse;
  readonly privacyPolicyLink = ConfigLink.PrivacyPolicy;

  constructor(
    private maskPipe: MaskPipe,
    private userFacade: UserFacade,
    public override dialogRef: MatDialogRef<UpdateProfileDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public user: User
  ) {
    super();
  }

  ngOnInit(): void {
    this.initializeForm();
  }

  changePhone() {
    this.disabledPhone = false;
    this.profile.otp = null;
    this.userFacade.resetSentOtpEvent();
  }

  sendingCode() {
    if (!this.isSamePhoneNumber) {
      if (this.isPhoneFieldValid) {
        this.disabledPhone = true;
        this.sendOtp();
      }
    }
  }

  sendOtp() {
    this.userFacade.sentOtp(this.profile.mobilePhone);
  }

  verifyOtp() {
    const payload: MobileVerificationRequest = {
      phoneNumber: this.profile.mobilePhone,
      otp: this.profile.otp,
    };
    if (this.isOtpFieldValid) {
      this.userFacade.verifyOtp(payload);
    }
  }

  override handleFormSubmit() {
    if (this.form.dirty) {
      const formValues = { ...this.profile };
      this.userFacade.updateProfile(formValues);
    } else {
      this.close();
    }
  }

  override close() {
    this.dialogRef.close(false);
  }

  initializeForm() {
    const { firstName, lastName, email, mobilePhone, id } = this.user;
    const formatMobilePhone = this.maskPipe.transform(mobilePhone, '(000) 000-0000');
    this.profile.firstName = firstName;
    this.profile.lastName = lastName;
    this.profile.email = email;
    this.profile.mobilePhone = formatMobilePhone;
    this.profile.userId = id;
    this.previousMobilePhone = formatMobilePhone;
  }

  get isSamePhoneNumber() {
    return this.profile.mobilePhone === this.previousMobilePhone;
  }

  get isOtpFieldValid() {
    return this.form?.controls['otp']?.valid;
  }

  get isPhoneFieldValid() {
    return this.form?.controls['mobilePhone']?.valid;
  }

  ngOnDestroy() {
    this.userFacade.resetSentOtpEvent();
    this.destroy();
  }
}
