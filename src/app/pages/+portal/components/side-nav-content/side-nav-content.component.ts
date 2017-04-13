import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';

import { HideSideNavAction } from '../../../../shared/redux/layout/actions';
import { LayoutState } from '../../../../shared/redux/layout/reducer';
import { NavSection } from '../../../../../mat-custom/components/side-nav/section.interface';
import { Observable } from 'rxjs';
import { RootState } from '../../../../shared/redux/index';
import { StateSelectors } from '../../../../shared/redux/selectors';
import { Store } from '@ngrx/store';
import { ViewEncapsulation } from '@angular/core';
import { createSelector } from 'reselect';

@Component({
  selector: 'side-nav-content',
  templateUrl: './side-nav-content.component.html',
  styleUrls: ['./side-nav-content.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SideNavContentCmp {

  @Output() public toggleMenu = new EventEmitter();

  public rootSection: NavSection = {
    icon: '',
    path: '',
    text: '',
    children: [{
      icon: 'lightbulb_outline',
      path: 'light-management',
      text: 'Lighting',
      children: [{
        path: 'light-management/landing',
        text: 'Landing',
      }, {
        path: 'light-management/map-view',
        text: 'Map',
      }, {
        path: 'light-management/device-list',
        text: 'Device Management',
      }]
    }, {
      icon: 'event',
      path: 'profile',
      text: 'Profile',
      children: [{
        path: 'profile/calendar',
        text: 'Calendar',
      }]
    }]
  };

  @Input()
  public active: boolean;

  public menuVisible: Observable<boolean>;

  constructor(
    private store: Store<RootState>,
    private ele: ElementRef
  ) {
    this.menuVisible = this.store.select(
      createSelector(StateSelectors.layout, (state: LayoutState) => {
        return state.sideMenuVisible;
      })
    );
  }

  public closeSidenav() {
    this.store.dispatch(new HideSideNavAction());
  }
}
