import { Component, Output, EventEmitter, Input } from '@angular/core';
import { Thing } from '../../../../models/thing.interface';

@Component({
  selector: 'bm-map-view',
  
})
export class MapViewCmp {
  @Output()
  public layerClick: EventEmitter<L.Polygon> = new EventEmitter();

  @Output()
  public markerClick: EventEmitter<L.Marker> = new EventEmitter();

  @Input()
  public currentLocation: Location;

  @Input()
  public devices: Thing[];

}
