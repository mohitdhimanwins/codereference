import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonHttpService } from 'src/app/core/services/common-http.service';
import { ToasterService } from 'src/app/core/services/toaster.service';
import { AuthenticationService } from 'src/app/core/services/authentication.service';

@Component({
  selector: 'app-login-detail',
  templateUrl: './login-detail.component.html',
  styleUrls: ['./login-detail.component.scss']
})
export class LoginDetailComponent implements OnInit {
  loginForm: FormGroup;
  @Output() detailSubmit = new EventEmitter<any>();


  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthenticationService,
    private toasterService: ToasterService
  ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  submitDetail() {
    if (this.loginForm.valid) {
      let controls = this.loginForm.controls;
      let request = {
        email: controls.email.value,
      };

      this.authService.sendOTP(request).subscribe((res) => {
          let data = {
            action: 'details',
            detail: request
          }
          this.detailSubmit.emit(data);
      }, err => {
        this.toasterService.showError(err.message || err?.reduce((c, m) => m + ' ', ''), "Error");
      });
    }
  }
}
