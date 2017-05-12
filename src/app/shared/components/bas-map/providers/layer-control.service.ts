import { Injectable, EventEmitter } from '@angular/core';
import { Location } from '../../../models/location.interface';
import { AreaFeature, Building } from '../../../models/building.interface';
import { MapUtils } from '../utils';
import { StateService } from './state.service';
import { LocationWithPath } from '../models/location-width-path.interface';
import { LocationService } from '../../../providers/resource-services/location.service';
import { Subject } from 'rxjs';

@Injectable()
export class LayerControl {

  public onLayerClick: Subject<L.Layer> = new Subject();
  private _currentPath: Location[];

  constructor(
    private myState: StateService,
    private _locationService: LocationService
  ) { }

  public init() {
    this.myState.onCurrentLocationChange.subscribe((result) => {
      console.log('updating layers');
      this._loadBuildingFeatures();
      this.updateLocationPicker(result.location, result.path);
    });
  }

  public async goBack() {
    let parent = await this._locationService.getParentLocation(this.myState.currentLocation);
    await this.myState.setCurrentLocation(parent);
  }

  private _clearLayers() {
    this.myState.layers.forEach((l) => {
      l.remove();
    });
  }

  private _loadBuildingFeatures() {
    this._clearLayers();
    let siblings: Location[] = [];
    if (this.myState.path.length > 1) {
      siblings = this.myState.path[this.myState.path.length - 2].subLocations;
    } else {
      siblings = [this.myState.currentLocation];
    }
    let featureLayers = this.myState.currentLocation
      .subLocations
      .reduce((ar, l) => ar.concat(this._initFeature(l)), [] as L.Polygon[]);

    let siblingLayers = siblings
      .reduce((ar, l) => ar.concat(this._initFeature(l)), [] as L.Polygon[]);

    featureLayers = featureLayers.concat(siblingLayers);

    featureLayers.forEach((f) => {
      f.addTo(this.myState.map);
    });

    siblingLayers.forEach((l) => {
      this.fadeAndDisableLayer(l);
    });

    this.myState.loadLayers(featureLayers);
  }

  private _initFeature(d: Location) {
    let layerOptions: L.PolylineOptions = {
      className: 'loc-layer'
    };

    let features = [];

    d.geos.forEach((polygon) => {
      let feature = L.polygon(polygon, layerOptions)
        .on('click', (event) => {
          this.onLayerClick.next(feature);
        });
      feature['location'] = d;
      features.push(feature);
    });

    return features;
  }

  private updateLocationPicker(location: Location, path: Location[]) {
    this._currentPath = path;
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
