import { Injectable } from '@angular/core';
import { Action, Store } from '@ngrx/store';
import { getAuthLoaded, getLogin, getUser, loggedIn } from './auth.selectors';

@Injectable({ providedIn: 'root' })
export class AuthFacade {
  loaded$ = this.store.select(getAuthLoaded);
  userLoggedIn$ = this.store.select(getLogin);
  userInSession$ = this.store.select(getUser);
  loggedIn$ = this.store.select(loggedIn);

  dispatch(action: Action) {
    this.store.dispatch(action);
  }

  constructor(private store: Store) {}
}
