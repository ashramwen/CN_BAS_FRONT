import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { BasORM } from '../../orm/orm.service';
import { RootState } from '../../redux/index';
import { StateSelectors } from '../../redux/selectors';
import { MetaInitSuccessAction } from '../../redux/global/actions';
import { ShowAppSpinnerAction, HideAppSpinnerAction } from '../../redux/layout/actions';
import {
  CanActivate, CanActivateChild,
  ActivatedRouteSnapshot, RouterStateSnapshot, Router, NavigationExtras
} from '@angular/router';

@Injectable()
export class MetaGuard implements CanActivate, CanActivateChild {
  constructor(
    private router: Router,
    private _orm: BasORM,
    private store: Store<RootState>
  ) { }

  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.checkSyncState();
  }

  public canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.canActivate(route, state);
  }

  private checkSyncState(): Promise<boolean> {
    return new Promise((resolve) => {
      this.store.select(StateSelectors.global).subscribe(async (globalState) => {
        try {
          if (globalState.metaInited) { return true; }
          this.store.dispatch(new ShowAppSpinnerAction());
          if (!this._orm.connection) {
            await this._orm.init();
          }
          this.store.dispatch(new MetaInitSuccessAction());
          resolve(true);
        } catch (e) {
          console.log(e);
          resolve(false);
        } finally {
          this.store.dispatch(new HideAppSpinnerAction());
        }
      });
    });
  }
}
