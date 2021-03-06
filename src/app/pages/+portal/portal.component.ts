import { Component, OnDestroy, ViewEncapsulation } from '@angular/core';
import {
  HideSideNavAction,
  ShowSideNavAction,
  ToggleSideNavAction,
} from '../../shared/redux/layout/actions';
import { MdDialog, MdDialogConfig } from '@angular/material';

import { GoUserInfoAction } from '../../shared/redux/layout/actions';
import { LayoutState } from '../../shared/redux/layout/reducer';
import { LocationCmp } from './location/location.component';
import { NavSection } from '../../../mat-custom/components/side-nav/section.interface';
import { Observable } from 'rxjs';
import { RootState } from '../../shared/redux/index';
import { StateSelectors } from '../../shared/redux/selectors';
import { StompService } from './../../shared/providers/stomp.service';
import { Store } from '@ngrx/store';
import { createSelector } from 'reselect';

@Component({
  selector: 'bas-portal',
  templateUrl: './portal.component.html',
  styleUrls: [
    './portal.component.scss'
  ],
  encapsulation: ViewEncapsulation.None
})
export class PortalCmp {
  public loading$: Observable<boolean>;
  public showSidenav$: Observable<boolean>;
  public swipeTabIndex$: Observable<number>;

  constructor(
    private store: Store<RootState>,
    private dialog: MdDialog,
    private stomp: StompService
  ) {
    this.loading$ = store.select(createSelector(
      StateSelectors.layout,
      (state: LayoutState) => !!state.loading
    ));
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

    this.stomp.init();
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
