import { Injectable } from '@angular/core';
import { BasMarker } from '../models/marker.interface';
import { Thing } from '../../../models/thing.interface';

@Injectable()
export class MarkerControlService {
  
  private _markers: BasMarker[];

  public loadMarkers(devices: Thing[], map: L.Map) {
    this._clearMarkers();
    this._markers = devices.map((d) => {
      return this._createMarker(d, map);
    });
    return this._markers;
  }

  private _createMarker(device: Thing, map: L.Map) {
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
    let marker: BasMarker = L.marker(device.geos, markerOptions);
    marker.device = device;
    marker.addTo(map);
    return marker;
  }

  private _clearMarkers() {
    if (!this._markers) { return; }
    this._markers.forEach((m) => { m.remove(); });
    this._markers = [];
  }
}