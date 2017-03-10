import { type } from '../utils';
import { Action } from '@ngrx/store';
import { Credential } from '../../models/credential.interface';

export const ActionTypes = {
  SHOW_SIDE_NAV: type('[Layout] ShowSideNav'),
  HIDE_SIDE_NAV: type('[Layout] HideSideNav'),
  TOGGLE_SIDE_NAV: type('[Layout] ToggleSideNav')
};

export class ShowSideNavAction implements Action {
  public type = ActionTypes.SHOW_SIDE_NAV;

  constructor() { }
}


export class HideSideNavAction implements Action {
  public type = ActionTypes.HIDE_SIDE_NAV;

  constructor() { }
}

export class ToggleSideNavAction implements Action {
  public type = ActionTypes.TOGGLE_SIDE_NAV;
}

export type Actions =
  ShowSideNavAction |
  HideSideNavAction |
  ToggleSideNavAction;
