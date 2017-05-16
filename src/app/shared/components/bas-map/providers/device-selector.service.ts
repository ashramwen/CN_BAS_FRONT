import { Injectable } from '@angular/core';
import { BMLocation } from '../../map-view/models/location.interface';
import { BMThing } from '../../map-view/models/thing.interface';

@Injectable()
export class DeviceSelectorService {

  private _selectedDevices: BMThing[];

  public get selectedDevices() {
    return this._selectedDevices;
  }

  constructor(

  ) { }

  public selectLocation(location: BMLocation) {
    
  }

  public toggleDevice(device: BMThing) {
    
  }
}
