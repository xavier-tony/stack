import { RouterReducerState } from '@ngrx/router-store';

import { AuthState } from './auth.interface';
import { RoutingState } from './routing.interface';
export interface AppState {
  router: RouterReducerState;
  auth: AuthState;
  routing: RoutingState;
}
