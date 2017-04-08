import { createSelector } from 'reselect';
import { MODULE_NAME } from './../constants';


export const moduleState = state => state[MODULE_NAME];
export const navigator = createSelector(
  moduleState,
  m => m.navigator
);
export const globalLoader = createSelector(
  moduleState,
  m => m.globalLoader
);
