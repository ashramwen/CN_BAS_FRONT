import { Component, Input, SimpleChanges } from '@angular/core';
import { Thing } from '../../../../../models/thing.interface';
import { DeviceService } from '../../../../../providers/resource-services/device.service';
import { Location } from '../../../../../models/location.interface';

export interface DeviceCheck extends Thing {
  checked: boolean;
}

@Component({
  selector: 'bm-device-seletor',
  templateUrl: './device-selector.component.html',
  styleUrls: ['./device-selector.component.scss']
})
export class DeviceSelectorCmp {
  public deviceList: DeviceCheck[] = [];
  public deviceCount: number = 0;

  @Input() public location: Location;

  constructor(
    private _deviceService: DeviceService
  ) { }

  public async ngOnChanges(changes: SimpleChanges) {
    if (changes['location'].currentValue !== changes['location'].previousValue) {
      this.deviceList = [];
      let devices = await this._deviceService.getThingsByLocation(this.location, true);
      devices.forEach((d) => {
        this.deviceList.push(Object.assign(d, { checked: true }));
      });
    }
  }
}
