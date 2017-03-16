import { Location } from '../../models/location.interface';
import {
  Actions,
  ActionTypes,
  AddAction
} from './actions';
import { Action } from '@ngrx/store';

export interface LocationState {
  locations: Location;
};

export const initialState: LocationState = {
  locations: null
};

export function locationReducer(state = initialState, action: Actions): LocationState {
  switch (action.type) {
    case ActionTypes.ADD: {
      return onAddAction(state, <AddAction> action);
    }
    default: {
      return state;
    }
  }
}

function onAddAction(state: LocationState, action: AddAction): LocationState {
  return Object.assign({}, state, {
    locations: action.payload
  });
}
