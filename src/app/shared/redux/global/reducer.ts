import { Actions, ActionTypes, MetaInitSuccessAction } from './actions';

export interface GlobalState {
  metaInited?: boolean;
};

export const initialState: GlobalState = {
  metaInited: false
};

export function globalReducer(state = initialState, action: Actions): GlobalState {
  switch (action.type) {
    case ActionTypes.META_INIT_SUCCESS: {
      return onMetaInitedSuccess(state, <MetaInitSuccessAction> action);
    }
    default: {
      return state;
    }
  }
}

function onMetaInitedSuccess(state: GlobalState, action: MetaInitSuccessAction): GlobalState {
  return Object.assign({}, state, {
    metaInited: true
  } as GlobalState);
}
