import { Data, Params } from '@angular/router';
import { RouterReducerState } from '@ngrx/router-store';
export interface RoutingStateUrl {
  url: string;
  params: Params;
  queryParams: Params;
  data: Data;
}

export interface RoutingState extends RouterReducerState<RoutingStateUrl> {
  previousState: RoutingStateUrl | undefined;
}
