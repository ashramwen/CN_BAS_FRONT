import { Component, Input, Output, EventEmitter } from '@angular/core';
import { DeviceCheck } from './location-card.component';

@Component({
  selector: 'bm-device-check',
  template: `
    <md-checkbox
      [(ngModel)]="device.checked"
    >
      {{device.deviceID}}
    </md-checkbox>
  `,
  styles: []
})
export class DeviceCheckCmp {
  @Input() public device: DeviceCheck;
}
