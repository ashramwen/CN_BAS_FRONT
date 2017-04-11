import { Component, Input, OnChanges, SimpleChanges, ElementRef, Output, EventEmitter } from '@angular/core';
import { Store } from '@ngrx/store';
import { RootState } from '../../../../shared/redux/index';
import { HideSideNavAction } from '../../../../shared/redux/layout/actions';

@Component({
  selector: 'side-nav-content',
  templateUrl: './side-nav-content.component.html',
  styleUrls: ['./side-nav-content.component.scss']
})
export class SideNavContentCmp {

  @Output() public toggleMenu = new EventEmitter();

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
