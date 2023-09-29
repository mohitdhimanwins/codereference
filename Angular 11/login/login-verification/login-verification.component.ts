import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { interval } from 'rxjs';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';
import { ToasterService } from 'src/app/core/services/toaster.service';
import { Utils } from 'src/app/core/util/utils';
import { AuthenticationService } from 'src/app/core/services/authentication.service';

@Component({
  selector: 'app-login-verification',
  templateUrl: './login-verification.component.html',
  styleUrls: ['./login-verification.component.scss']
})
export class LoginVerificationComponent implements OnInit {
  otp: number = null;
  isOtpSubmitted: boolean = false;
  progressbarValue = 100;
  timeLeft: number = 0;
  timerSubscription;
  isOtpExpired: boolean = false;

  @Input() selectedRoleData;
  @Input() detail;
  @Output() otpSubmit = new EventEmitter<any>();

  constructor(
    public router: Router,
    private authService: AuthenticationService,
    private toasterService: ToasterService
  ) { }

  ngOnInit(): void {
    this.startTimer(180);
  }

  verifyOtp() {
    this.isOtpSubmitted = true;
    if (this.otp) {
      this.authService.authenticate({
        username: this.detail.email,
        otp: this.otp
      }).subscribe(
        res => { },
        err => { this.toasterService.showError(err.message || err?.reduce((c, m) => m + ' ', ''), "Error") }
      )
    }
  }


  startTimer(seconds: number) {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
      this.progressbarValue = 100;
      this.timeLeft = 0;
      this.isOtpExpired = false;
    }

    const timer$ = interval(1000);
    this.timerSubscription = timer$.subscribe((curSec) => {
      let second = curSec + 1;
      this.progressbarValue = 100 - second * 100 / seconds;
      this.timeLeft = seconds - second;
      if (second === seconds) {
        this.isOtpExpired = true;
        this.timerSubscription.unsubscribe();
      }
    });
  }

  resendOtp() {
    this.authService.sendOTP({
      email: this.detail.email,
    }).subscribe((res) => {
      this.startTimer(180);
      this.toasterService.showSuccess("Success!", "Success");
    }, err => {
      this.toasterService.showError(err.message || err?.reduce((c, m) => m + ' ', ''), "Error")
    });
  }

  checkOtp(event: any) {
    Utils.allowNumber(event);
  }
}
