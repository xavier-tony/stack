import { routerNavigatedAction } from '@ngrx/router-store';
import { Action, createReducer, on } from '@ngrx/store';
import { RoutingState } from '@stack/models';

export const initialRouterState: RoutingState = {
  state: {} as any,
  previousState: undefined,
  navigationId: '' as any,
};

const routingReducer = createReducer(
  initialRouterState,
  on(routerNavigatedAction, (currentState, action) => ({
    ...currentState,
    state: action.payload.routerState as any,
    previousState: currentState.state || null,
    navigationId: action.payload.event.id,
  }))
);

export function reducer(state: RoutingState | undefined, action: Action) {
  return routingReducer(state, action);
}
