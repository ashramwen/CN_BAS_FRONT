import { type } from '../utils';
import { Action } from '@ngrx/store';
import { Credential } from '../../models/credential.interface';
import { Location } from '../../models/location.interface';

export const ActionTypes = {
  ADD: type('[Location] Add'),
};

export class AddAction implements Action {
  public type = ActionTypes.ADD;

  constructor(
    public payload: Location
  ) { }
}

export type Actions =
  AddAction; 
