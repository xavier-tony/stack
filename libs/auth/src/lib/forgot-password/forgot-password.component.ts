import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ForgotPasswordFormGroup, Validation } from '@stack/models';
import { PasswordValidationService } from '@stack/services';
import { ForgotPasswordService } from './forgot-password.service';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'stack-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent implements OnInit {
  form = this.forgotPasswordService.buildForgotPasswordForm();
  showPassword = false;
  showConfirmPassword = false;

  get password() {
    return this.form.get('password');
  }

  get confirmPassword() {
    return this.form.get('confirmPassword');
  }

  get code() {
    return this.form.get('code');
  }

  passwordValidationRules: Validation =
    this.passwordValidationService.passwordValidationRules;
  constructor(
    private forgotPasswordService: ForgotPasswordService,
    private passwordValidationService: PasswordValidationService
  ) {}

  ngOnInit(): void {
    this.initialize();
  }

  initialize() {
    this.setValidationRules();
    this.password?.valueChanges
      .pipe(tap(() => this.setValidationRules()))
      .subscribe();
  }

  forgotPassword() {
    this.forgotPasswordService.forgotPassword(this.form);
  }

  setValidationRules() {
    this.passwordValidationRules = {
      ...this.passwordValidationService.updateValidations<ForgotPasswordFormGroup>(
        this.passwordValidationRules,
        this.form,
        'password'
      ),
    };
  }
}
