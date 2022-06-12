import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on, Action } from '@ngrx/store';
import { AuthState, LoginInfo, User } from '@stack/models';

import * as AuthActions from './auth.actions';
import { AuthEntity } from './auth.models';

export const AUTH_FEATURE_KEY = 'auth';

export const initialState: AuthState = {
  loaded: false,
  login: null,
  user: null,
};

const authReducer = createReducer(
  initialState,
  on(
    AuthActions.signup,
    AuthActions.login,
    AuthActions.refreshLogin,
    AuthActions.logout,
    state => ({
      ...state,
      loaded: false,
      error: null,
    })
  ),
  on(
    AuthActions.signupSuccess,
    AuthActions.loginSuccess,
    AuthActions.refreshLoginSuccess,
    (state, { user, login }) => ({
      ...state,
      loaded: true,
      error: null,
      user,
      login,
    })
  ),
  on(
    AuthActions.signupFailed,
    AuthActions.loginFailed,
    AuthActions.refreshLoginFailed,
    AuthActions.logoutFailed,
    (state, { error }) => ({
      ...state,
      loaded: true,
      error,
    })
  ),
  on(AuthActions.logoutSuccess, state => initialState)
);

export function reducer(state: AuthState | undefined, action: Action) {
  return authReducer(state, action);
}
