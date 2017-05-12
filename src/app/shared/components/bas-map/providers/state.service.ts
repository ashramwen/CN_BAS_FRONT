import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Location } from '../../../models/location.interface';
import { Building } from '../../../models/building.interface';
import { LocationWithPath } from '../models/location-width-path.interface';
import { LocationService } from '../../../providers/resource-services/location.service';

@Injectable()
export class StateService {
  public onLayerChanged: Subject<L.Polygon[]>;
  public onMapReady: Subject<boolean>;
  public onSelectionModeChange: Subject<boolean>;
  public onCurrentLocationChange: Subject<LocationWithPath>;
  public onCurrentLocationChanged: Subject<void>;
  public onStateChanged: Subject<void>;

  private _map: L.Map;
  private _selectionMode: boolean = false;
  private _currentLocation: Location;
  private _locationTree: Location;
  private _mapState: boolean = false;
  private _layers: L.Polygon[] = [];
  private _path: Location[] = [];

  constructor(
    private _locationService: LocationService
  ) {
    this.onLayerChanged = new Subject<L.Polygon[]>();
    this.onMapReady = new Subject<boolean>();
    this.onSelectionModeChange = new Subject<boolean>();
    this.onCurrentLocationChange = new Subject<LocationWithPath>();
    this.onStateChanged = new Subject<void>();
  }

  public async init() {
    try {
      this._locationTree = await this._locationService.root;
      this.setCurrentLocation(this._locationTree);
      this._currentLocation = this._locationTree;
    } catch (e) {
      console.log(e);
    }
  }

  public get layers() {
    return this._layers;
  }

  public get selectionMode() {
    return this._selectionMode;
  }

  public get currentLocation() {
    return this._currentLocation;
  }

  public get locationTree() {
    return this._locationTree;
  }

  public get map() {
    return this._map;
  }

  public get path() {
    return this._path;
  }

  public loadLayers(layers: L.Polygon[]) {
    this._layers = layers;
    this.onLayerChanged.next(this._layers);
    this.onStateChanged.next();
  }

  public setMapState(flag: boolean) {
    this._mapState = flag;
    if (this._mapState) {
      this.onMapReady.next(flag);
      this.onStateChanged.next();
    }
  }

  public setSelectionMode(mode: boolean) {
    this._selectionMode = mode;
    this.onSelectionModeChange.next(mode);
    this.onStateChanged.next();
  }

  public async setCurrentLocation(location: Location) {
    this._currentLocation = await this._locationService.getLocation(location.location);
    if (!this._currentLocation.subLocations
      || !this._currentLocation.subLocations.length
    ) {
      return;
    }
    let path = await this._locationService.getLocationPath(location);
    this._path = path;
    this.onCurrentLocationChange.next({ location, path });
    this.onStateChanged.next();
  }

  public setMap(map: L.Map) {
    this._map = map;
  }
}
