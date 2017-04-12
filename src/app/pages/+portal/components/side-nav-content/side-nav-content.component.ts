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
      icon: 'book',
      path: 'landing',
      text: 'Welcome',
      children: [{
        path: 'landing',
        text: 'Landing',
      },{
        path: 'landing',
        text: 'Landing',
      },{
        path: 'landing',
        text: 'Landing',
      }]
    }, {
      icon: 'map',
      path: 'map-view',
      text: 'Map',
    }, {
      icon: 'lightbulb_outline',
      path: 'device-list',
      text: 'Device List',
    }]
  };

  @Input()
  public active: boolean;

  constructor(
    private store: Store<RootState>,
    private ele: ElementRef
  ) { }

  public closeSidenav() {
    this.store.dispatch(new HideSideNavAction());
  }

}
