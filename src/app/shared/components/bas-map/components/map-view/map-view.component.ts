import {
  Component,
  Output,
  EventEmitter,
  Input,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
  HostListener
} from '@angular/core';
import { Thing } from '../../../../models/thing.interface';
import { BasArea } from './models/area.interface';
import { BasMarker } from './models/marker.interface';
import { Location } from '../../../../models/location.interface';
import { MapUtils } from './utils';
import { LayerControlService } from './services/layer-control.service';
import { OnChanges, SimpleChanges } from '@angular/core';
import { Subject } from 'rxjs';
import { BMLocation } from './models/location.interface';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'bm-map-view',
  template: `
    <div class="bas-map-target" #mapTarget></div>
  `,
  styleUrls: ['./map-view.component.scss'],
  providers: [LayerControlService]
})
export class MapViewCmp implements OnInit, AfterViewInit, OnChanges {
  @Output()
  public layerClick: EventEmitter<BMLocation> = new EventEmitter();

  @Output()
  public markerClick: EventEmitter<Thing> = new EventEmitter();

  @Output()
  public mapInit: EventEmitter<L.Map> = new EventEmitter();

  @Input()
  public locations: Location[];

  @Input()
  public set zoom(value) {
    this._zoom = value;
    this._updateView();
  }

  @Input()
  public devices: Thing[];

  @ViewChild('mapTarget')
  public mapTarget: ElementRef;

  private _zoom: number;  
  private _map: L.Map;
  private _layers: BasArea[];
  private _markers: BasMarker[];
  private _mapInited: Subject<boolean> = new Subject();
  private _locationChanged: Subject<BMLocation[]> = new Subject();
  private _devicesChanged: Subject<Thing[]> = new Subject();

  constructor(
    private _layerControl: LayerControlService
  ) { }

  /**
   * update view when window is resized
   * 
   * 
   * @memberOf MapViewCmp
   */
  @HostListener('window:resize')
  public windowResize() {
    this._updateView();
  }

  public ngOnInit() {
    Observable
      .forkJoin(this._mapInited, this._locationChanged)
      .subscribe((result) => {
        if (!result[0]) { return; }
        this._loadLocations(result[1]);
        this._updateView();
      });
    // this._devicesChanged.subscribe((devices) => {
      
    // });
  }

  public ngOnChanges(changes: SimpleChanges) {
    if (changes['locations'].currentValue != changes['locations'].previousValue) {
      this._locationChanged.next(this.locations);
    }
  }

  public ngAfterViewInit() {
    this._initMap();
  }

  /**
   * clear & load location layers on map
   * 
   * @private
   * @param {BMLocation[]} locations 
   * 
   * @memberOf MapViewCmp
   */
  private _loadLocations(locations: BMLocation[]) {
    this._layerControl.clearLayers(this._layers);
    this._layers = this._layerControl.loadBuildingFeatures(locations);
    this._layers.forEach((l) => {
      l.addEventListener('click', () => {
        this.layerClick.emit(l.location);
      });
    });
  }


  /**
   * init map
   * 
   * @private
   * 
   * @memberOf MapViewCmp
   */
  private _initMap() {
    this._map = L.map(this.mapTarget.nativeElement, {
      center: [
        30.28084740214,
        120.02401130217
      ],
      zoom: 18,
      maxZoom: 23,
      minZoom: 17
    });
    this._map.removeControl(this._map['zoomControl']);

    L.tileLayer(this.tileUrl, {
      maxZoom: 18,
      attribution: '',
      id: 'mapbox.streets'
    }).addTo(this._map);

    this._mapInited.next(true);
    this.mapInit.emit(this._map);
  }

  /**
   * update map view 
   * 
   * @private
   * 
   * @memberOf MapViewCmp
   */
  private _updateView() {
    let bounds = this._findBounds();
    let center: L.LatLngExpression =
      [(bounds.top + bounds.bottom) / 2, (bounds.left + bounds.right) / 2];
    let zoom = this._zoom;
    this._map.setView(center, zoom, {
      animate: true
    });
    let mapBounds
      = new L.LatLngBounds([
        bounds.bottom + 0.001,
        bounds.left - 0.001
      ], [
        bounds.top - 0.001,
        bounds.right + 0.001
      ]);
    this._map.setMaxBounds(mapBounds);
  }

  /**
   * map tile resource url.
   * subject to be replaced when better resource is found.
   * 
   * @readonly
   * @private
   * @type {string}
   * @memberOf MapViewCmp
   */
  private get tileUrl(): string {
    return 'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?'
      + 'access_token=pk.eyJ1IjoieXR5c3p4ZiIsImEiOiJjaXo'
      + '1OHN3OTcwNmJpMzNwaHVycmo5djllIn0.aBzti__T5lS8LDQhjyYsGA';
  }

  /**
   * find layer bounds
   * 
   * @private
   * @returns 
   * 
   * @memberOf MapViewCmp
   */
  private _findBounds() {
    let left = null;
    let right = null;
    let top = null;
    let bottom = null;

    let layers = this._layers;
    if (!layers || !layers.length) {
      let bounds = this._map.getBounds();
      left = bounds.getWest();
      top = bounds.getNorth();
      bottom = bounds.getSouth();
      right = bounds.getEast();
    } else {
      return MapUtils.findBounds(layers);
    }
  }
}
