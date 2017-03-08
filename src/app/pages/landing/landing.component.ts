import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { RootState } from '../../shared/redux/index';
import { LogOutAction } from '../../shared/redux/token/actions';
import { SessionService } from '../../shared/providers/session.service';

@Component({
  selector: 'landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingCmp {

  constructor(
    private store: Store<RootState>,
    private session: SessionService
  ) {}

  public logout() {
    this.store.dispatch(new LogOutAction());
  }
}