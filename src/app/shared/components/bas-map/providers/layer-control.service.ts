import { Injectable, EventEmitter } from '@angular/core';
import { Location } from '../../../models/location.interface';
import { AreaFeature, Building } from '../../../models/building.interface';
import { MapUtils } from '../utils';
import { StateService } from './state.service';
import { LocationWithPath } from '../models/location-width-path.interface';

@Injectable()
export class LayerControl {

  private _currentBuilding: Location = null;
  private _currentLevel: Location = null;
  private _currentPartition: Location = null;
  private _currentArea: Location = null;

  constructor(
    private myState: StateService
  ){}

  public init() {
    this.myState.onCurrentLocationChange.subscribe((result) => {
      this.updateLocationPicker(result.location, result.path);
      this.updateLayersView();
    });
    this.setLocation(this.myState.locationTree.location);
  }

  public setLocation(location: string) {
    let result: LocationWithPath = MapUtils.findLocationWithPath(location,
      this.myState.locationTree,
      [this.myState.locationTree]
    );
    if (result.location.locationLevel === 'building') {
      let levels = this.myState.geoData.find((b) => b.id === result.path[1].location).levels;
      if (!levels || !levels[0]) {
        throw new Error(`level is not existing for building: ${result.path[1].location}`);
      }
      let newLocation = result.path[1].subLocations
        .find((level) => {
          return level.location === levels[0].id;
        }).location;

      if (!newLocation) {
        throw new Error(`level: ${levels[0]} has no defination in locaiton schema`);
      }

      this.setLocation(newLocation);
      return;
    }

    this.myState.setCurrentLocation(result.location, result.path);
    
  }

  public goBack() {
    let parentLocation: string = '';
    switch (this.myState.currentLocation.locationLevel) {
      case 'area':
        parentLocation = this.myState.currentLocation.parent.location;
        break;
      case 'site':
        parentLocation = this.myState.currentLocation.parent.parent.location;
        break;
      case 'partition':
        parentLocation = this.myState.currentLocation.parent.parent.location;
        break;
      case 'floor':
        parentLocation = this.myState.currentLocation.parent.parent.location;
        break;
      default:
        break;
    }
    this.setLocation(parentLocation);
  }

  private updateLocationPicker(location: Location, path: Location[]) {
    switch (this.myState.currentLocation.locationLevel) {
      case 'site':
      case 'area':
        this._currentArea = path[4];
      case 'partition':
        this._currentPartition = path[3];
        if (this.myState.currentLocation.locationLevel === 'partition') {
          this._currentArea = null;
        }
      case 'floor':
        this._currentLevel = path[2];
        if (this.myState.currentLocation.locationLevel === 'floor') {
          this._currentArea = null;
          this._currentPartition = null;
        }
      case 'building':
        this._currentBuilding = path[1];
      case undefined:
      default:
        this._currentBuilding = null;
        this._currentArea = null;
        this._currentLevel = null;
        this._currentPartition = null;
        break;
    }
  }

  private updateLayersView() {

    // if current location is floor level then
    //  display all partition level area of this floor, hide other buildings/levels/areas
    // else if current location is partition level then
    //  display all area level areas of this partition, hide all buildings/levels,
    //  and fade other partitions in the same level
    if (!this.myState.currentLocation.locationLevel) {
      this.myState.layers.forEach((l) => {
        if ((<AreaFeature> l.feature).properties.parentID === this.myState.currentLocation.location) {
          this.hightlightLayer(l);
        } else {
          this.hideLayer(l);
        }
      });
    } else if (this.myState.currentLocation.locationLevel === 'floor') {
      this.myState.layers.forEach((l) => {
        let feature: AreaFeature = <AreaFeature> l.feature;
        if (feature.properties.parentID === this.myState.currentLocation.location) {
          this.hightlightLayer(l);
        } else if (feature.properties.tag === this.myState.currentLocation.parent.location) {
          this.fadeAndDisableLayer(l);
        } else {
          this.hideLayer(l);
        }
      });
    } else if (this.myState.currentLocation.locationLevel === 'partition') {
      this.myState.layers.forEach((l) => {
        if ((<AreaFeature> l.feature).properties.parentID === this.myState.currentLocation.location) {
          this.hightlightLayer(l);
        } else if ((<AreaFeature> l.feature).properties.role === 'partition'
          && (<AreaFeature> l.feature).properties.parentID === this.myState.currentLocation.parent.location
        ) {
          if ((<AreaFeature> l.feature).properties.tag === this.myState.currentLocation.location) {
            this.fadeAndDisableLayer(l);
          } else {
            this.fadeAndEnableLayer(l);
          }
        } else {
          this.hideLayer(l);
        }
      });
    }
  }

  private hightlightLayer(layer: L.Polygon) {
    MapUtils.removeClass(layer, 'fade');
    MapUtils.removeClass(layer, 'hide');
    this.enableLayer(layer);
  }

  private fadeAndDisableLayer(layer: L.Polygon) {
    this.fadeLayer(layer);
    this.disableLayer(layer);
  }

  private fadeAndEnableLayer(layer: L.Polygon) {
    this.fadeLayer(layer);
    this.enableLayer(layer);
  }

  private fadeLayer(layer: L.Polygon) {
    MapUtils.addClass(layer, 'fade');
  }

  private hideLayer(layer: L.Polygon) {
    MapUtils.addClass(layer, 'hide');
  }

  private disableLayer(layer: L.Polygon) {
    MapUtils.addClass(layer, 'disabled');
  }

  private enableLayer(layer: L.Polygon) {
    MapUtils.removeClass(layer, 'disabled');
  }
}
