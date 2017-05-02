import { type } from '../utils';
import { Action } from '@ngrx/store';
import { Credential } from '../../models/credential.interface';
import { Observable } from 'rxjs/Observable';

export const ActionTypes = {
  META_INIT_SUCCESS: type('[Global] META_INIT_SUCCESS'),
};

export class MetaInitSuccessAction implements Action {
  public type = ActionTypes.META_INIT_SUCCESS;
}

export type Actions =
  MetaInitSuccessAction;
