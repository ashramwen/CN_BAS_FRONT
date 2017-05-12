import { Component, Input, SimpleChanges } from '@angular/core';
import { Thing } from '../../../../../models/thing.interface';
import { DeviceService } from '../../../../../providers/resource-services/device.service';
import { Location } from '../../../../../models/location.interface';

export interface DeviceCheck extends Thing {
  checked: boolean;
}

const MAX_DEVICES = 50;

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

  public get showDevices() {
    return this.deviceCount <= MAX_DEVICES && this.deviceCount !== 0;
  }

  public async ngOnChanges(changes: SimpleChanges) {
    if (changes['location'].currentValue !== changes['location'].previousValue) {
      this.deviceList = [];
      this.deviceCount = await this._deviceService.getThingsCountByLocation(this.location, true);
      if (this.deviceCount > MAX_DEVICES) {
        return;
      }
      let devices = await this._deviceService.getThingsByLocation(this.location, true);
      devices.forEach((d) => {
        this.deviceList.push(Object.assign(d, { checked: true }));
      });
    }
  }
}
