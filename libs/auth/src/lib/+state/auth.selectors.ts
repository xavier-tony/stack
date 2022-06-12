import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from '@stack/models';
import { AUTH_FEATURE_KEY } from './auth.reducer';

// Lookup the 'Auth' feature state managed by NgRx
export const getAuthState = createFeatureSelector<AuthState>(AUTH_FEATURE_KEY);

export const getAuthLoaded = createSelector(
  getAuthState,
  (state: AuthState) => state.loaded
);

export const getAuthError = createSelector(
  getAuthState,
  (state: AuthState) => state.error
);

export const getUser = createSelector(getAuthState, state => state.user);

export const getLogin = createSelector(getAuthState, state => state.login);

export const loggedIn = createSelector(getLogin, login => !!login);
