import { Injectable } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import {
  ForgotPasswordFormGroup,
  RequestForgotPasswordFormGroup,
} from '@stack/models';
import { AuthFacade } from '../+state';
import * as AuthActions from '@stack/auth';
import { PasswordValidatorService } from '@stack/services';

@Injectable({ providedIn: 'root' })
export class ForgotPasswordService {
  constructor(
    private formBuilder: FormBuilder,
    private authFacade: AuthFacade,
    private passwordValidatorService: PasswordValidatorService
  ) {}

  buildRequestForgotPasswordForm() {
    return this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  buildForgotPasswordForm() {
    return this.formBuilder.group(
      {
        password: [
          '',
          [
            Validators.required,
            this.passwordValidatorService.passwordValidator(),
          ],
        ],
        confirmPassword: ['', [Validators.required]],
        code: ['', [Validators.required, Validators.minLength(5)]],
      },
      {
        validators: [
          this.passwordValidatorService.comparePasswordValidator(
            'password',
            'confirmPassword'
          ),
        ],
      }
    );
  }

  requestForgotPassword(form: FormGroup<RequestForgotPasswordFormGroup>) {
    if (form.invalid) return;
    const email = form.value.email!;
    this.authFacade.dispatch(AuthActions.requestForgotPassword({ email }));
  }

  forgotPassword(form: FormGroup<ForgotPasswordFormGroup>) {
    if (form.invalid) return;

    //TODO: custom validator for password /confirm password match

    const password = btoa(form.value.password!);
    const code = form.value.code!;

    this.authFacade.dispatch(AuthActions.forgotPassword({ password, code }));
  }
}
