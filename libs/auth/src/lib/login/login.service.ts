import { Injectable } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { LoginFormGroup, LoginRequest } from '@stack/models';

import * as AuthActions from '@stack/auth';
import { AuthFacade } from '@stack/auth';
import { RoutingFacade } from '@stack/shared/components';

@Injectable({ providedIn: 'root' })
export class LoginService {
  constructor(
    private formBuilder: FormBuilder,
    private authFacade: AuthFacade
  ) {}

  buildForm() {
    return this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      rememberMe: [false, Validators.required],
    });
  }

  login(form: FormGroup<LoginFormGroup>) {
    if (!form.valid) return;
    const inputs = form.value;
    const user: LoginRequest = {
      email: inputs.email!,
      password: btoa(inputs.password!),
      rememberMe: inputs.rememberMe || false,
    };
    this.authFacade.dispatch(AuthActions.login({ user }));
  }
}
