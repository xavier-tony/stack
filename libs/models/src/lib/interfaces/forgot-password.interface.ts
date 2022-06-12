import { FormControl } from '@angular/forms';

export interface RequestForgotPasswordFormGroup {
  email: FormControl<string | null>;
}

export interface ForgotPasswordFormGroup {
  password: FormControl<string | null>;
  confirmPassword: FormControl<string | null>;
  code: FormControl<string | null>;
}
