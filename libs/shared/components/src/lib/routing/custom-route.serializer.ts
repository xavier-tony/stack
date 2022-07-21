import { RouterStateSnapshot } from '@angular/router';
import { RouterStateSerializer } from '@ngrx/router-store';
import { RoutingStateUrl } from '@stack/models';

export class CustomSerializer
  implements RouterStateSerializer<RoutingStateUrl>
{
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
