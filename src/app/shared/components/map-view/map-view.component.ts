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
import { BasArea } from './models/area.interface';
import { BasMarker } from './models/marker.interface';
import { MapUtils } from './utils';
import { LayerControlService } from './services/layer-control.service';
import { OnChanges, SimpleChanges } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';
import { BMLocation } from './models/location.interface';
import { Observable } from 'rxjs/Observable';
import { MarkerControlService } from './services/marker-control.service';
import { Thing } from '../../models/thing.interface';
import { Location } from '../../models/location.interface';

@Component({
  selector: 'bm-map-view',
  template: `
    <div class="bas-map-target" #mapTarget></div>
  `,
  styleUrls: ['./map-view.component.scss'],
  providers: [LayerControlService, MarkerControlService]
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
    if (this._zoom === value) { return; }
    this._zoom = value;
    this._mapViewChanged.next(void 0);
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
  private _locationChanged: BehaviorSubject<BMLocation[]> = new BehaviorSubject<BMLocation[]>([]);
  private _devicesChanged: BehaviorSubject<Thing[]> = new BehaviorSubject([]);
  private _mapViewChanged: BehaviorSubject<void> = new BehaviorSubject<void>(void 0);

  constructor(
    private _layerControl: LayerControlService,
    private _markerControl: MarkerControlService
  ) { }

  /**
   * update view when window is resized
   * 
   * 
   * @memberOf MapViewCmp
   */
  @HostListener('window:resize')
  public windowResize() {
    let opt: L.ZoomPanOptions = {
      animate: true
    };
    this._map.invalidateSize(opt);
  }

  public ngOnInit() {
    this._mapInited.subscribe(() => {
      this._locationChanged.subscribe((result) => {
        this._loadLocations(result);
      });
      this._mapViewChanged.subscribe(() => {
        this._updateView();
      });
      this._devicesChanged.subscribe((result) => {
        this._loadMarkers(result);
      });
    });
  }

  public ngOnChanges(changes: SimpleChanges) {
    if (changes['locations'] && changes['locations'].currentValue != changes['locations'].previousValue) {
      this._locationChanged.next(this.locations);
    }
    if (changes['devices'] && changes['devices'].currentValue != changes['devices'].previousValue) {
      this._devicesChanged.next(this.devices);
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
    this._layers = this._layerControl.loadBuildingFeatures(locations, this._map);
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

  private _loadMarkers(devices: Thing[]) {
    this._markerControl
      .loadMarkers(devices, this._map)
      .forEach((marker) => {
        marker.addEventListener('click', () => {
          this.markerClick.emit(marker.device);
        });
      });
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
      animate: true,
      duration: 1000
    });
    // let mapBounds
    //   = new L.LatLngBounds([
    //     bounds.bottom + 0.001,
    //     bounds.left - 0.001
    //   ], [
    //     bounds.top - 0.001,
    //     bounds.right + 0.001
    //   ]);
    // this._map.setMaxBounds(mapBounds);
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
      return {
        left, top, bottom, right
      };
    } else {
      return MapUtils.findBounds(layers);
    }
  }
}
