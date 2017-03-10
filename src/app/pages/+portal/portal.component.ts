import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { RootState } from '../../shared/redux/index';
import { StateSelectors } from '../../shared/redux/selectors';
import { createSelector } from 'reselect';
import { LayoutState } from '../../shared/redux/layout/reducer';
import { HideSideNavAction, ShowSideNavAction, ToggleSideNavAction } from '../../shared/redux/layout/actions';

@Component({
  selector: 'bas-portal',
  template: `
    <md-sidenav-container fullscreen>
      <md-sidenav  #sidenav mode="side" [opened]="showSidenav$ | async">
        <side-nav></side-nav>
      </md-sidenav>
      <div class="content-container">
        <bas-toolbar (toggleMenu)="toggleSidenav()" [menuVisible]="showSidenav$ | async">
          Book Collection
        </bas-toolbar>

        <router-outlet></router-outlet>
      </div>
    </md-sidenav-container>
  `,
  styles: [
    `
      md-sidenav{
        box-shadow: 0px 0px 5px 2px rgba(0,0,0,0.3);
      }
    `
  ]
})
export class PortalCmp {
  public showSidenav$: Observable<boolean>;

  constructor(private store: Store<RootState>) {
    /**
     * Selectors can be applied with the `select` operator which passes the state
     * tree to the provided selector
     */
    
    this.showSidenav$ = this.store.select(
      createSelector(
        StateSelectors.layout,
        (state: LayoutState) => state.sideMenuVisible
      ));
  }

  public toggleSidenav() {
    this.store.dispatch(new ToggleSideNavAction());
  }

}
