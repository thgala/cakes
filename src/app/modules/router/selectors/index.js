import { createSelector } from 'reselect';
import { MODULE_NAME } from './../constants';

export const moduleState = state => state[MODULE_NAME] || {};
export const params = createSelector(
  moduleState,
  m => m.params || {}
);
export const paramsStore = createSelector(
  params,
  p => p.store || {}
);

export const location = createSelector(
  moduleState,
  m => m.location || {}
);

export const locationQuery = createSelector(
  location,
  l => l && l.query || {}
);

export const routes = createSelector(
  moduleState,
  m => (m && m.routes && m.routes.length) ? m.routes : []
);

export const routeProps = createSelector(
  moduleState,
  m => (m && m.routes && m.routes.length) ? m.routes[m.routes.length - 1] : {}
);