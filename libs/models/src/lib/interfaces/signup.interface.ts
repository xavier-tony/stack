import { FormControl, FormGroup } from '@angular/forms';
import { UserTypes } from '../enums';
import { LoginInfo } from './login.interface';
import { User } from './user.interface';

export interface SignupForm {
  firstname: FormControl<string | null>;
  lastname: FormControl<string | null>;
  email: FormControl<string | null>;
  password: FormControl<any | null>;
  confirmPassword: FormControl<string | null>;
}
export interface SignupFormGroup {
  userType: FormControl<UserTypes | null>;
  signup: FormGroup<SignupForm>;
}

export interface SignupResponse {
  user: User;
  login: LoginInfo;
}

export interface LoginResponse extends SignupResponse {}
