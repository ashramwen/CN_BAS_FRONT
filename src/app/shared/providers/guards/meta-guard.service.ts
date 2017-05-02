import { Injectable } from '@angular/core';
import { BasORM } from '../../orm/orm.service';
import { SyncronizeService } from '../../orm/services/syncronize.service';
import { Store } from '@ngrx/store';
import { RootState } from '../../redux/index';
import { StateSelectors } from '../../redux/selectors';
import { MetaInitSuccessAction } from '../../redux/global/actions';
import {
  CanActivate, CanActivateChild,
  ActivatedRouteSnapshot, RouterStateSnapshot, Router, NavigationExtras
} from '@angular/router';

@Injectable()
export class MetaGuard implements CanActivate, CanActivateChild {
  constructor(
    private router: Router,
    private _orm: BasORM,
    private _sycnService: SyncronizeService,
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
          if (globalState.metaInited) return true;
          await this._orm.init();
          await this._sycnService.sync();
          this.store.dispatch(new MetaInitSuccessAction);
          resolve(true);
        } catch (e) {
          console.log(e);
          resolve(false);
        }
      });
    });
  }
}
