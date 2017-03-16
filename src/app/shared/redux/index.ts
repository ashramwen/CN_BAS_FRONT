import { EffectsModule } from '@ngrx/effects';
import { ActionReducer } from '@ngrx/store';
import { compose } from '@ngrx/core';

/**
 * storeFreeze prevents state from being mutated. When mutation occurs, an
 * exception will be thrown. This is useful during development mode to
 * ensure that none of the reducers accidentally mutates the state.
 */
import { storeFreeze } from 'ngrx-store-freeze';

/**
 * combineReducers is another useful metareducer that takes a map of reducer
 * functions and creates a new reducer that stores the gathers the values
 * of each reducer and stores them using the reducer's key. Think of it
 * almost like a database, where every reducer is a table in the db.
 *
 * More: https://egghead.io/lessons/javascript-redux-implementing-combinereducers-from-scratch
 */
import { combineReducers } from '@ngrx/store';

import { locationReducer, LocationState } from './location';
import { LayoutState, layoutReducer } from './layout';
import { TokenState, TokenEffects, tokenReducer } from './token';
import { routerReducer } from '@ngrx/router-store';
import { RouterStateSnapshot } from '@angular/router';

const reducers = {
  token: tokenReducer,
  router: routerReducer,
  layout: layoutReducer,
  location: locationReducer
};

export const EFFECTS = [TokenEffects].map((effect) => {
  return EffectsModule.run(effect);
});

export interface RootState {
  token: TokenState;
  layout: LayoutState;
  router: RouterStateSnapshot;
  location: LocationState;
}

const developmentReducer: ActionReducer<RootState>
  = compose(storeFreeze, combineReducers)(reducers);
const productionReducer: ActionReducer<RootState> = combineReducers(reducers);

export function reducer(state: any, action: any) {
  if (ENV === 'production') {
    return productionReducer(state, action);
  } else {
    return developmentReducer(state, action);
  }
}
