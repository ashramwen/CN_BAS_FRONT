import { EffectsModule } from '@ngrx/effects';

import {TokenState, TokenEffects, tokenReducer} from './token';
import { tokenSelector } from './token/index';

export const reducers = {
  token: tokenReducer
};

export const EFFECTS = [TokenEffects].map(effect => {
  return EffectsModule.run(effect);
});

export interface RootState {
  token: TokenState
}

export const StateSelectors = {
  token: tokenSelector
};

