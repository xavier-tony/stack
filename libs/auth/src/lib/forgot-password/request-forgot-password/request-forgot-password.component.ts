import { Component, OnInit } from '@angular/core';
import { ForgotPasswordService } from '../forgot-password.service';

@Component({
  selector: 'stack-request-forgot-password',
  templateUrl: './request-forgot-password.component.html',
  styleUrls: ['./request-forgot-password.component.scss'],
})
export class RequestForgotPasswordComponent implements OnInit {
  form = this.forgotPasswordService.buildRequestForgotPasswordForm();

  get email() {
    return this.form.get('email');
  }

  constructor(private forgotPasswordService: ForgotPasswordService) {}
  ngOnInit(): void {}

  requestForgotPassword() {
    this.forgotPasswordService.requestForgotPassword(this.form);
  }
}
