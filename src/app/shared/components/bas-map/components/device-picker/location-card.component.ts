import { Component, Input } from '@angular/core';
import { Location } from '../../../../models/location.interface';

export interface DeviceCheck{
  deviceID: string;
  checked: boolean
}

@Component({
  selector: 'bm-location-card',
  template: `
    <section class="loc-section">
      <div class="section-headeing">
        <md-checkbox
          [(ngModel)]="checked"
        >
          {{location.fullName}}
        </md-checkbox>
      </div>
      <md-list class="device-list">
        <md-list-item *ngFor="let device of deviceList">
          <bm-device-check 
            [device]="device" 
          >
          </bm-device-check>
        </md-list-item>
      </md-list>
    </section>
  `,
  styles: [``]
})
export class LocationCardCmp {
  @Input() public location: Location;

  constructor(
    
  ){}

  public deviceList: DeviceCheck[] = [{
    deviceID: '0807W-W01001',
    checked: false
  },{
    deviceID: '0807W-W01002',
    checked: false
  }];

}
