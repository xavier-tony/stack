import { Params, RouterStateSnapshot } from '@angular/router';
import { RouterStateSerializer } from '@ngrx/router-store';
import { RoutingStateUrl } from '../../../../../models/src/lib/interfaces/routing.interface';

export class CustomSerializer implements RouterStateSerializer<RoutingStateUrl> {
  serialize(routerState: RouterStateSnapshot): RoutingStateUrl {
    let route = routerState.root;

    while (route.firstChild) {
      route = route.firstChild;
    }

    const {
      url,
      root: { queryParams },
    } = routerState;
    const { params, data } = route;

    // Only return an object including the URL, params and query params
    // instead of the entire snapshot
    return { url, params, queryParams, data };
  }
}
