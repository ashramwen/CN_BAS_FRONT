import { Location } from '../../models/location.interface';
import {
  Actions,
  ActionTypes,
  ShowSideNavAction,
  ToggleSideNavAction,
  HideSideNavAction
} from './actions';
import { Action } from '@ngrx/store';

export interface LayoutState {
  sideMenuVisible: boolean
};

export const initialState: LayoutState = {
  sideMenuVisible: true
};

export function layoutReducer(state = initialState, action: Actions): LayoutState {
  switch (action.type) {
    case ActionTypes.SHOW_SIDE_NAV: {
      return onShowSideNavAction(state, <ShowSideNavAction> action);
    }
    case ActionTypes.HIDE_SIDE_NAV: {
      return onHideSideNavAction(state, <HideSideNavAction> action);
    }
    case ActionTypes.TOGGLE_SIDE_NAV: {
      return onToggleSideNavAction(state, <ToggleSideNavAction> action);
    }
    default: {
      return state;
    }
  }
}

function onShowSideNavAction(state: LayoutState, action: ShowSideNavAction): LayoutState {
  return Object.assign({}, state, {
    sideMenuVisible: true
  });
}

function onHideSideNavAction(state: LayoutState, action: HideSideNavAction): LayoutState {
  return Object.assign({}, state, {
    sideMenuVisible: false
  });
}

function onToggleSideNavAction(state: LayoutState, action: ToggleSideNavAction): LayoutState {
  return Object.assign({}, state, {
    sideMenuVisible: !state.sideMenuVisible
  });
}
