import { createAction, props } from '@ngrx/store';
import { LoginInfo, LoginRequest, User } from '@stack/models';

export const init = createAction('[Auth Page] Init');

export const signup = createAction(
  '[Signup Page] Signup',
  props<{ user: User }>()
);

export const signupSuccess = createAction(
  '[Signup Effect] Signup Success',
  props<{ user: User; login: LoginInfo }>()
);

export const signupFailed = createAction(
  '[Signup Effect] Signup Failed',
  props<{ error: any }>()
);

export const login = createAction(
  '[Login Page] Login',
  props<{ user: LoginRequest }>()
);

export const loginSuccess = createAction(
  '[Login Effect] Login Success',
  props<{ user: User; login: LoginInfo }>()
);

export const loginFailed = createAction(
  '[Login Effect] Login Failed',
  props<{ error: any }>()
);

export const refreshLogin = createAction('[APP_INITIALIZER] Refresh Login');

export const refreshLoginSuccess = createAction(
  '[Refresh Login Effect] Refresh Login Success',
  props<{ user: User; login: LoginInfo }>()
);

export const refreshLoginFailed = createAction(
  '[Refresh Login Effect] Refresh Login Failed',
  props<{ error: any }>()
);

export const logout = createAction('[Header Link] Logout');

export const logoutSuccess = createAction('[Logout Effect] Logout Success');

export const logoutFailed = createAction(
  '[Logout Effect] Logout Failed',
  props<{ error: any }>()
);

export const requestForgotPassword = createAction(
  '[Forgot Password Page] Request Forgot Password',
  props<{ email: string }>()
);

export const forgotPasswordApproved = createAction(
  '[Request Forgot Password Effect] Forgot Password Approved'
);

export const forgotPasswordDeclined = createAction(
  '[Request Forgot Password Effect] Forgot Password Declined',
  props<{ error: any }>()
);

export const forgotPassword = createAction(
  '[Forgot Password Approved Effect] Forgot Password',
  props<{ password: string; code: string }>()
);

export const forgotPasswordSuccess = createAction(
  '[Forgot Password Effect] Forgot Password Success'
);

export const forgotPasswordFailed = createAction(
  '[Forgot Password Effect] Forgot Password Failed',
  props<{ error: any }>()
);

export const resetPassword = createAction(
  '[Reset Password Page] Reset Password',
  props<{ email: string; password: string; code: string }>()
);

export const resetPasswordSuccess = createAction(
  '[Reset Password Effect] Reset Password Success'
);

export const resetPasswordFailed = createAction(
  '[Forgot Password Page] Reset Password',
  props<{ error: any }>()
);
