import { Component, Output, EventEmitter } from '@angular/core';
import { Store } from '@ngrx/store';
import { MdDialog } from '@angular/material';

import { RootState } from '../../../shared/redux/index';
import { LogOutAction } from '../../../shared/redux/token/actions';
import { PasswordChangeCmp } from './password-change/password-change.component';
import { GoMainAction } from '../../../shared/redux/layout/actions';
import {
  ConfirmModal
} from '../../../../mat-custom/components/confirm-modal/confirm-modal.service';

@Component({
  selector: 'user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoCmp {

  constructor(
    private store: Store<RootState>,
    private dialog: MdDialog,
    private confirm: ConfirmModal
  ) { }

  public logout() {
    let result = this.confirm.open({
      message: `Are you sure to logout?`,
      callback: () => {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve();
          });
        });
      }
    });

    result.ok.subscribe(() => {
      this.store.dispatch(new LogOutAction());
    });
  }

  public goMain() {
    this.store.dispatch(new GoMainAction());
  }

  public openChangePasswordDialog() {
    let dialogRef = this.dialog.open(PasswordChangeCmp, {
      width: '300px',
    });
    dialogRef.componentInstance.close.subscribe(() => {
      dialogRef.close();
    });
  }
}
