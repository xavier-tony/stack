import { Injectable } from '@angular/core';
import { RoutingState, RoutingStateUrl } from '@stack/models';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as RoutingSelectors from './+state/routing.selectors';
import { Params } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class RoutingFacade {
  constructor(private store: Store<RoutingState>) {}

  currentRoute$: Observable<RoutingStateUrl> = this.store.select(
    RoutingSelectors.getCurrentRoute
  );
  queryParams$: Observable<Params> = this.store.select(
    RoutingSelectors.getQueryParams
  );
}
