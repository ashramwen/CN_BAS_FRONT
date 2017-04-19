import { Injectable } from '@angular/core';
import { MdSnackBar } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class AlertModal {

  constructor(
    public snackBar: MdSnackBar,
    private translate: TranslateService
  ) { }

  public success(message: string, action?: string, duration?: number) {
    this.open(message, action, duration, 'success');
  }

  public failure(message: string, action?: string, duration?: number) {
    this.open(message, action, duration, 'failure');
  }

  private open(
    message: string,
    action: string = 'controls.ok',
    duration: number = 2000,
    extraClass: string
  ) {
    let deliverable: { message: string, action: string };
    this.translate.get(message)
      .zip(this.translate.get(action))
      .map((res) => ({
        message: res[0],
        action: res[1]
      }))
      .subscribe((res) => {
        deliverable = res;
      });

    this.snackBar.open(deliverable.message, deliverable.action, {
      duration,
    });
  }
}
