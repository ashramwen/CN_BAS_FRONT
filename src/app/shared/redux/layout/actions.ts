import { type } from '../utils';
import { Action } from '@ngrx/store';
import { Credential } from '../../models/credential.interface';
import { Observable } from 'rxjs/Observable';

export const ActionTypes = {
  SHOW_SIDE_NAV: type('[Layout] ShowSideNav'),
  HIDE_SIDE_NAV: type('[Layout] HideSideNav'),
  TOGGLE_SIDE_NAV: type('[Layout] ToggleSideNav'),
  SHOW_LOADING: type('[Layout] ShowLoading'),
  HIDE_LOADING: type('[Layout] HideLoading'),
  GO_USER_INFO: type('[Layout] GoUserInfo'),
  GO_MAIN: type('[Layout] GoMain'),
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


export class ShowLoadingAction implements Action {
  public type = ActionTypes.SHOW_LOADING;
}


export class HideLoadingAction implements Action {
  public type = ActionTypes.HIDE_LOADING;
}

export class GoUserInfoAction implements Action {
  public type = ActionTypes.GO_USER_INFO;
}

export class GoMainAction implements Action {
  public type = ActionTypes.GO_MAIN;
}

export type Actions =
  ShowSideNavAction |
  HideSideNavAction |
  ToggleSideNavAction |
  GoUserInfoAction |
  GoMainAction;
