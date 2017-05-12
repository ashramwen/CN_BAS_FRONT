import { Injectable } from '@angular/core';
import { StateService } from './state.service';
import { Location } from '../../../models/location.interface';
import { DeviceService } from '../../../providers/resource-services/device.service';
import * as L from 'leaflet';
import { Thing } from '../../../models/thing.interface';

const MAX_DEVICES = 200;

@Injectable()
export class MarkerControl {

  private _markers: L.Marker[];

  constructor(
    private myState: StateService,
    private _deviceService: DeviceService
  ) { }

  public init() {
    this.myState.onCurrentLocationChange.subscribe((locationWithPath) => {
      this._loadMarkers(locationWithPath.location);
    });
  }

  private async _loadMarkers(location: Location) {
    this._clearMarkers();
    let devicesCount = await this._deviceService.getThingsCountByLocation(location, true);
    if (devicesCount > MAX_DEVICES) { return; }
    let devices = await this._deviceService.getThingsByLocation(location, true);
    this._markers = devices.map((d) => {
      return this._createMarker(d);
    });
  }

  private _createMarker(device: Thing) {
    let icon = L.divIcon({
      iconSize: [24, 24],
      html: `
        <svg fill="#000000" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
        </svg>
      `,
      className: 'device-icon'
    });
    let markerOptions: L.MarkerOptions = {
      icon: icon,
      clickable: true,
      draggable: false,
      keyboard: false,
      title: device.vendorThingID,
      alt: device.vendorThingID,
      opacity: 1,
      riseOnHover: true,
      riseOffset: 10
    };
    markerOptions['data'] = device;
    let marker = L.marker(device.geos, markerOptions);
    marker.addTo(this.myState.map);
    return marker;
  }

  private _clearMarkers() {
    if (!this._markers) { return; }
    this._markers.forEach((m) => { m.remove(); });
    this._markers = [];
  }
}
