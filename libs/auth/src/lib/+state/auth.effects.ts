import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';

import * as AuthActions from './auth.actions';
import { map, tap, withLatestFrom } from 'rxjs/operators';
import { switchMap, catchError, of } from 'rxjs';
import { AuthService } from '../auth.service';
import { User } from '@stack/models';
import { NavigationExtras, Router } from '@angular/router';
import { RoutingFacade } from '../../../../shared/components/src/lib/routing/routing.facade';

@Injectable()
export class AuthEffects {
  signup$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.signup),
      map(action => action.user),
      switchMap((user: User) =>
        this.authService.signup(user).pipe(
          map(data =>
            data
              ? AuthActions.signupSuccess({
                  user: data.user || undefined,
                  login: data.login || undefined,
                })
              : AuthActions.signupFailed({ error: 'ERROR' })
          ),
          catchError(error => of(AuthActions.signupFailed({ error })))
        )
      )
    )
  );

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login),
      switchMap(({ user }) =>
        this.authService.login(user).pipe(
          map(response =>
            response
              ? AuthActions.loginSuccess({
                  user: response.user,
                  login: response.login,
                })
              : AuthActions.loginFailed({ error: 'Failed' })
          ),
          catchError(error => of(AuthActions.loginFailed({ error })))
        )
      )
    )
  );

  refreshLogin$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.refreshLogin),
      switchMap(() =>
        this.authService.refreshLogin().pipe(
          map(response =>
            response
              ? AuthActions.refreshLoginSuccess({
                  user: response.user,
                  login: response.login,
                })
              : AuthActions.refreshLoginFailed({ error: 'Failed' })
          ),
          catchError(error => of(AuthActions.refreshLoginFailed({ error })))
        )
      )
    )
  );

  logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.logout),
      switchMap(() =>
        this.authService.logout().pipe(
          map(() => AuthActions.logoutSuccess()),
          catchError(error => of(AuthActions.logoutFailed({ error })))
        )
      )
    )
  );

  redirectOnLogoutSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.logoutSuccess),
        tap(() => this.router.navigate(['/logout']))
      ),
    { dispatch: false }
  );

  requestForgotPassword$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.requestForgotPassword),
      map(action => action.email),
      switchMap(email =>
        this.authService.requestForgotPassword(email).pipe(
          map(() => AuthActions.forgotPasswordApproved()),
          catchError(error => of(AuthActions.forgotPasswordDeclined({ error })))
        )
      )
    )
  );

  redirectOnForgotPasswordRequestApproved$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.forgotPasswordApproved),
        tap(() => this.router.navigate(['/forgot-password']))
      ),
    { dispatch: false }
  );

  forgotPassword$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.forgotPassword),
      switchMap(({ password, code }) =>
        this.authService.forgotPassword(password, code).pipe(
          map(() => AuthActions.forgotPasswordSuccess()),
          catchError(error => of(AuthActions.forgotPasswordFailed({ error })))
        )
      )
    )
  );

  redirectOnForgotPasswordSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.forgotPasswordSuccess),
        map(() => this.router.navigate(['/login']))
      ),
    { dispatch: false }
  );

  redirectOnAuthSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.loginSuccess, AuthActions.signupSuccess),
        withLatestFrom(this.routingFacade.queryParams$),
        map(([_, { redirecturl }]) =>
          this.router.navigate([redirecturl || 'dashboard'])
        )
      ),
    { dispatch: false }
  );

  constructor(
    private readonly actions$: Actions,
    private authService: AuthService,
    private router: Router,
    private routingFacade: RoutingFacade
  ) {}
}
