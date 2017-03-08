import { type } from '../utils';
import { Action } from '@ngrx/store';
import { Token } from '../../models/token.interface';
import { Credential } from '../../models/credential.interface';

export const ActionTypes = {
  STORE: type('[Token] Store'),
  STORE_SUCCESS: type('[Token] StoreSuccess'),
  CLEAR: type('[Token] Clear'),
  VALIDATE: type('[Token] Validate'),
  LOAD: type('[Token] Load'),
  LOAD_SUCCESS: type('[Token] Load'),
  LOAD_FAILED: type('[Token] LoadFailed'),
  LOGIN_SUCCESS: type('[Token] LoginSuccess'),
  LOGIN_FAILED: type('[Token] LoginFailed'),
};

export class LoginSuccessAction implements Action {
  public type = ActionTypes.LOGIN_SUCCESS;

  constructor(public payload: Token) { }
}

export class LoginFailureAction implements Action {
  public type = ActionTypes.LOGIN_FAILED;

  constructor(public payload: {errorCode: number, statusCode: number, errorMessage: string}) { }
}

export class ValidateAction implements Action {
  public type = ActionTypes.VALIDATE;

  constructor() { }
}

export class ClearAction implements Action {
  public type = ActionTypes.CLEAR;

  constructor() { }
}

export class LoadAction implements Action {
  public type = ActionTypes.LOAD;

  constructor() { }
}

export class LoadSuccessAction implements Action {
  public type = ActionTypes.LOAD_SUCCESS;

  constructor(public payload: Token) { }
}

export class LoadFailureAction implements Action {
  public type = ActionTypes.LOAD_FAILED;

  constructor() { }
}

export class StoreSuccessAction implements Action {
  public type = ActionTypes.STORE_SUCCESS;

  constructor() { }
}

export type Actions =
  ClearAction |
  LoginSuccessAction |
  LoginFailureAction |
  ValidateAction |
  LoadAction |
  LoadSuccessAction |
  LoadFailureAction;
