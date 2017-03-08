import { EffectsModule } from '@ngrx/effects';

import {TokenState, TokenEffects, tokenReducer} from './token';

export const reducers = {
  token: tokenReducer
};

export const EFFECTS = [TokenEffects].map(effect => {
  return EffectsModule.run(effect);
});

export interface RootState {
  token: TokenState
}
