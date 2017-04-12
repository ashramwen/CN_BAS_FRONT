import {
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  ElementRef,
  Output,
  EventEmitter
} from '@angular/core';
import { Store } from '@ngrx/store';

import { RootState } from '../../../../shared/redux/index';
import { HideSideNavAction } from '../../../../shared/redux/layout/actions';
import { NavSection } from '../../../../../mat-custom/components/side-nav/section.interface';
import { ViewEncapsulation } from '@angular/core';
import { Observable } from 'rxjs';
import { createSelector } from 'reselect';
import { StateSelectors } from '../../../../shared/redux/selectors';
import { LayoutState } from '../../../../shared/redux/layout/reducer';

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
