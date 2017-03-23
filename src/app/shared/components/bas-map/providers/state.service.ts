import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Location } from '../../../models/location.interface';
import { Building } from '../../../models/building.interface';
import { LocationWithPath } from '../models/location-width-path.interface';

@Injectable()
export class StateService {
  private _selectionMode: boolean = false;
  private _currentLocation: Location;
  private _locationTree: Location;
  private _geoData: Building[];
  private _mapState: boolean = false;
  private _layers: L.Polygon[];

  public onLayerLoad: Subject<L.Polygon[]> = new Subject<L.Polygon[]>();
  public onMapReady: Subject<boolean> = new Subject<boolean>();
  public onSelectionModeChange: Subject<boolean> = new Subject<boolean>();
  public onCurrentLocationChange: Subject<LocationWithPath> = new Subject<LocationWithPath>();

  public init(
    locationTree: Location,
    geoData: Building[]
  ) {
    this._locationTree = locationTree;
    this._geoData = geoData;
    this._currentLocation = this._locationTree;
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

  public get geoData() {
    return this._geoData;
  }

  public loadLayer(layers: L.Polygon[]) {
    this._layers = layers;
    this.onLayerLoad.next(this._layers);
  }

  public setMapState(flag: boolean) {
    this._mapState = flag;
    if (this._mapState) {
      this.onMapReady.next(flag);
    }
  }

  public setSelectionMode(mode: boolean) {
    this._selectionMode = mode;
    this.onSelectionModeChange.next(mode);
  }

  public setCurrentLocation(location: Location, path: Location[]) {
    this._currentLocation = location;
    this.onCurrentLocationChange.next({ location, path });
  }
}
