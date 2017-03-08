import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/skip';
import 'rxjs/add/operator/takeUntil';
import { Injectable } from '@angular/core';
import { Effect, Actions, toPayload } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { empty } from 'rxjs/observable/empty';
import { of } from 'rxjs/observable/of';
import { ActionTypes, LoadAction, LoadSuccessAction, LoadFailureAction, StoreSuccessAction } from './actions';
import { LocalStorageService } from 'angular-2-local-storage';
import { LOCAL_STORAGE_KEYS } from '../../constants/local-storage';
import { Token } from '../../models/token.interface';

@Injectable()
export class TokenEffects {

  @Effect()
  public load$: Observable<Action> = this.actions$
    .ofType(ActionTypes.LOAD)
    .startWith(new LoadAction())
    .switchMap(() => {
      let token: Token = <Token>this.localStorage.get(LOCAL_STORAGE_KEYS.TOKEN);
      if (token) {
        return Observable.of(new LoadSuccessAction(token));
      } else {
        return Observable.of(new LoadFailureAction);
      }
    });

  @Effect()
  public store$: Observable<Action> = this.actions$
    .ofType(ActionTypes.STORE)
    .map(toPayload)
    .switchMap((token: Token) => {
      return Observable.of(new StoreSuccessAction);
    });
    
  constructor(private actions$: Actions, private localStorage: LocalStorageService) { }
}