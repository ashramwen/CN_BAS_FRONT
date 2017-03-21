import { Injectable, EventEmitter } from '@angular/core';
import { Location } from '../../../models/location.interface';
import { AreaFeature, Building } from '../../../models/building.interface';

interface LocationWithPath {
  location: Location;
  path: Location[];
}

@Injectable()
export class LayerControl {

  public buildings: Building[];
  public locationTree: Location;
  public layers: L.Polygon[];
  public locationChangeEvent: EventEmitter<Location> = new EventEmitter();

  private _currentLocation: Location = null;
  private _currentBuilding: Location = null;
  private _currentLevel: Location = null;
  private _currentPartition: Location = null;
  private _currentArea: Location = null;

  public init(buildings: Building[], locationTree: Location, layers: L.Polygon[]) {
    this.buildings = buildings;
    this.locationTree = locationTree;
    this.layers = layers;
    this.setLocation(this.locationTree.location);
  }

  public setRootLocation(location: Location) {
    this.locationTree = location;
  }

  public setLocation(location: string) {
    let result: LocationWithPath = this.findLocation(location,
      this.locationTree,
      [this.locationTree]
    );
    this._currentLocation = result.location;
    this.onLocationChange(result);
  }

  public goBack() {
    let parentLocation: string = '';
    switch (this._currentLocation.locationLevel) {
      case 'area':
        parentLocation = this._currentLocation.parent.location;
        break;
      case 'site':
        parentLocation = this._currentLocation.parent.parent.location;
        break;
      case 'level':
        parentLocation = this._currentLocation.parent.parent.location;
        break;
      default:
        break;
    }
    this.setLocation(parentLocation);
  }

  /**
   * @description back button is visible or not
   */
  public get backButtonIsVisible(): boolean {
    return this._currentLocation.locationLevel === 'area'
      || this._currentLocation.locationLevel === 'level'
      || this._currentLocation.locationLevel === 'site';
  }

  private onLocationChange(event: LocationWithPath) {
    switch (this._currentLocation.locationLevel) {
      case 'site':
      case 'area':
        this._currentArea = event.path[4];
      case 'partition':
        this._currentPartition = event.path[3];
        if (this._currentLocation.locationLevel === 'partition') {
          this._currentArea = null;
        }
      case 'floor':
        this._currentLevel = event.path[2];
        if (this._currentLocation.locationLevel === 'floor') {
          this._currentArea = null;
          this._currentPartition = null;
        }
      case 'building':
        this._currentBuilding = event.path[1];
        if (this._currentLocation && this._currentLocation.locationLevel !== 'building') {
          break;
        }
        let levels = this.buildings.find((b) => b.id === event.path[1].location).levels;
        if (!levels || !levels[0]) {
          return;
        }
        let newLocation = event.path[1].subLocations
          .find((level) => {
            return level.location === levels[0].id;
          }).location;

        if (!newLocation) {
          throw new Error(`level: ${levels[0]} has no defination in locaiton schema`);
        }

        this.setLocation(newLocation);
        return;
      case undefined:
      default:
        this._currentBuilding = null;
        this._currentArea = null;
        this._currentLevel = null;
        this._currentPartition = null;
        break;
    }
    this.whenAreaSelected();
    this.locationChangeEvent.emit(this._currentLocation);
  }

  private whenAreaSelected() {

    // if current location is floor level then
    //  display all partition level area of this floor, hide other buildings/levels/areas
    // else if current location is partition level then
    //  display all area level areas of this partition, hide all buildings/levels,
    //  and fade other partitions in the same level
    if (!this._currentLocation.locationLevel) {
      this.layers.forEach((l) => {
        if ((<AreaFeature> l.feature).properties.parentID === this._currentLocation.location) {
          this.hightlightLayer(l);
        } else {
          this.hideLayer(l);
        }
      });
    } else if (this._currentLocation.locationLevel === 'floor') {
      this.layers.forEach((l) => {
        let feature: AreaFeature = <AreaFeature> l.feature;
        if (feature.properties.parentID === this._currentLocation.location) {
          this.hightlightLayer(l);
        } else if (feature.properties.tag === this._currentLocation.parent.location) {
          this.fadeAndDisableLayer(l);
        } else {
          this.hideLayer(l);
        }
      });
    } else if (this._currentLocation.locationLevel === 'partition') {
      this.layers.forEach((l) => {
        if ((<AreaFeature> l.feature).properties.parentID === this._currentLocation.location) {
          this.hightlightLayer(l);
        } else if ((<AreaFeature> l.feature).properties.role === 'partition'
          && (<AreaFeature> l.feature).properties.parentID === this._currentLocation.parent.location
        ) {
          if ((<AreaFeature> l.feature).properties.tag === this._currentLocation.location) {
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

  private findLocation(
    location: string,
    locationNode: Location,
    path: Location[]
  ): LocationWithPath {
    if (locationNode.location === location) {
      return {
        location: locationNode,
        path
      };
    }
    for (let subNode of locationNode.subLocations) {
      let result = this.findLocation(location, subNode, path.concat([subNode]));
      if (result) {
        return result;
      }
    }
  }

  private hightlightLayer(layer: L.Polygon) {
    let opt: L.PathOptions = {
      fill: true,
      stroke: true,
      opacity: 0.8
    };
    layer.setStyle(opt);
    // this.enableLayer(layer);
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
    let opt: L.PathOptions = {
      fill: true,
      stroke: true,
      opacity: 0.3
    };
    layer.setStyle(opt);
  }

  private hideLayer(layer: L.Polygon) {
    let opt: L.PathOptions = {
      fill: false,
      stroke: false,
      opacity: 0.3
    };
    layer.setStyle(opt);
  }

  private disableLayer(layer: L.Polygon) {
    // let opt: L.InteractiveLayerOptions = {
    //   interactive: false
    // };
    // layer.setStyle(opt);
    layer.getElement().classList.add('disabled');
  }

  private enableLayer(layer: L.Polygon) {
    // let opt: L.InteractiveLayerOptions = {
    //   interactive: true
    // };
    // layer.setStyle(opt);
    layer.getElement().classList.remove('disabled');
  }
}
