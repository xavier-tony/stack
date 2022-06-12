import { routerReducer, RouterReducerState } from '@ngrx/router-store';
import { ActionReducerMap } from '@ngrx/store';
import { AppState } from '@stack/models';

export const appReducer: ActionReducerMap<Partial<AppState>> = {
  router: routerReducer
};
 