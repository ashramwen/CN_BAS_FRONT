import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { RootState } from '../../../../shared/redux/index';
import { HideSideNavAction } from '../../../../shared/redux/layout/actions';

@Component({
  selector: 'side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavCmp { 

  constructor(
    private store: Store<RootState>
  ){}

  public closeSidenav() {
    this.store.dispatch(new HideSideNavAction());
  }
}