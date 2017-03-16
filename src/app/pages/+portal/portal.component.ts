import { Component, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { createSelector } from 'reselect';
import { MdDialog, MdDialogConfig } from '@angular/material';

import { RootState } from '../../shared/redux/index';
import { StateSelectors } from '../../shared/redux/selectors';
import { LayoutState } from '../../shared/redux/layout/reducer';
import { LocationCmp } from './location/location.component';
import { GoUserInfoAction } from '../../shared/redux/layout/actions';
import {
  HideSideNavAction,
  ShowSideNavAction,
  ToggleSideNavAction
} from '../../shared/redux/layout/actions';

@Component({
  selector: 'bas-portal',
  templateUrl: './portal.component.html',
  styleUrls: [
    './portal.component.scss'
  ]
})
export class PortalCmp {
  public showSidenav$: Observable<boolean>;
  public swipeTabIndex$: Observable<number>;

  constructor(
    private store: Store<RootState>,
    private dialog: MdDialog
  ) {
    /**
     * Selectors can be applied with the `select` operator which passes the state
     * tree to the provided selector
     */
    this.showSidenav$ = this.store.select(
      createSelector(
        StateSelectors.layout,
        (state: LayoutState) => state.sideMenuVisible
      ));

    this.swipeTabIndex$ = this.store.select(
      createSelector(
        StateSelectors.layout,
        (state: LayoutState) => state.swipeTabIndex
      ));
  }

  public toggleSidenav() {
    this.store.dispatch(new ToggleSideNavAction());
  }

  public onRouteActivated() {
    this.store.dispatch(new HideSideNavAction());
  }

  public showUserInfo() {
    this.store.dispatch(new GoUserInfoAction());
  }
}
