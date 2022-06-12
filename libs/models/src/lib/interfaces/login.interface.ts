import { FormControl } from '@angular/forms';

export interface LoginFormGroup {
  email: FormControl<string | null>;
  password: FormControl<string | null>;
  rememberMe: FormControl<boolean | null>;
}

export interface LoginRequest {
  email: string;
  password: string;
  rememberMe: boolean;
}

export interface LoginInfo {
  id: number;
  loggedIn: boolean;
  loggedInDate?: Date;
  loginAttempts: number;
  impersonated: boolean;
  userId: number;
  email: string;
  userTypeId: number;
  location?: any;
  device?: any;
}
