import { createFeatureSelector, createSelector } from '@ngrx/store';
import { RoutingState } from '@stack/models';

export const getRoutingState = createFeatureSelector<RoutingState>('routing');

export const getCurrentRoute = createSelector(
  getRoutingState,
  state => state.state
);

export const getQueryParams = createSelector(
  getCurrentRoute,
  route => route.queryParams
);
