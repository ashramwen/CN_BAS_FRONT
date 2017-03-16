import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { RootState } from '../../../shared/redux/index';
import { LogOutAction } from '../../../shared/redux/token/actions';
import { SessionService } from '../../../shared/providers/session.service';
import { StateSelectors } from '../../../shared/redux/selectors';

@Component({
  selector: 'bas-map-view',
  templateUrl: './map-view.component.html',
  styleUrls: ['./map-view.component.scss']
})
export class MapViewCmp {

  constructor(
    private store: Store<RootState>,
  ) { }

}
