import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '@stack/models';
import { HttpClient } from '@angular/common/http';
import { combineLatest } from 'rxjs';
import { filter, first, map, tap } from 'rxjs/operators';
import { AuthFacade } from '@stack/auth';
import * as AuthActions from '@stack/auth';

@Injectable({ providedIn: 'root' })
export class LoginInitService {
  constructor(
    private store: Store<AppState>,
    private http: HttpClient,
    private authFacade: AuthFacade
  ) {}

  refreshLogin(): () => Promise<void> {
    return () =>
      new Promise<void>((resolve, reject) => {
        this.authFacade.dispatch(AuthActions.refreshLogin());
        combineLatest([this.authFacade.loaded$, this.authFacade.loggedIn$])
          .pipe(
            filter(([loaded, loggedIn]) => loaded),
            map(([loaded, loggedIn]) => loggedIn),
            tap(console.log),
            first()
          )
          .subscribe(() => resolve());
      });
  }
}
