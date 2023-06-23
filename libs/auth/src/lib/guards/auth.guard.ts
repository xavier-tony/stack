import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Route,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthFacade } from '../+state/auth.facade';
import { filter, mapTo, tap, map } from 'rxjs/operators';
import * as AuthActions from '@stack/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard {
  constructor(private authFacade: AuthFacade, private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.authFacade.loggedIn$.pipe(
      map(loggedIn => {
        if (!loggedIn) {
          console.log(route, state);
          this.router.navigate(['/login'], {
            queryParams: { redirecturl: state.url },
          });
          return false;
        }
        return true;
      })
    );
  }
}

@Injectable({ providedIn: 'root' })
export class canLoadAuthGuard {
  constructor(private authFacade: AuthFacade, private router: Router) {}

  canLoad(route: Route) {
    return this.authFacade.loggedIn$.pipe(
      map(loggedIn => {
        if (!loggedIn) {
          console.log(route);
          this.router.navigate(['/login'], {
            queryParams: { redirecturl: route.path },
          });
          return false;
        }
        return true;
      })
    );
  }
}
