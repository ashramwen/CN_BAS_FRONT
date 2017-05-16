import { Injectable } from '@angular/core';
import { BasArea } from '../models/area.interface';
import { MapUtils } from '../utils';
import { BMLocation } from '../models/location.interface';

@Injectable()
export class LayerControlService {

  public clearLayers(layers: BasArea[]) {
    if (!layers) { return; }
    layers.forEach((l) => {
      l.remove();
    });
  }

  public loadBuildingFeatures(locations: BMLocation[], map: L.Map) {

    let featureLayers = locations
      .reduce((ar, l) => ar.concat(this._initFeature(l)), [] as BasArea[]);
    
    featureLayers.forEach((l) => {
      l.addTo(map);
      if (l.location.disabled) {
        this.fadeAndDisableLayer(l);
      }
      if (l.location.selected) {
        this.hightlightLayer(l);
      }
    });
    
    return featureLayers;
  }

  private _initFeature(d: BMLocation) {
    let layerOptions: L.PolylineOptions = {
      className: 'loc-layer'
    };

    let features = [];

    d.geos.forEach((polygon) => {
      let feature: BasArea = L.polygon(polygon, layerOptions);
      feature.location = d;
      features.push(feature);
    });

    return features;
  }

  private hightlightLayer(layer: BasArea) {
    MapUtils.removeClass(layer, 'fade');
    MapUtils.removeClass(layer, 'hide');
    MapUtils.addClass(layer, 'selected');
    this.enableLayer(layer);
  }

  private fadeAndDisableLayer(layer: BasArea) {
    this.fadeLayer(layer);
    this.disableLayer(layer);
  }

  private fadeAndEnableLayer(layer: BasArea) {
    this.fadeLayer(layer);
    this.enableLayer(layer);
  }

  private fadeLayer(layer: BasArea) {
    MapUtils.addClass(layer, 'fade');
  }

  private hideLayer(layer: BasArea) {
    MapUtils.addClass(layer, 'hide');
  }

  private disableLayer(layer: BasArea) {
    MapUtils.addClass(layer, 'disabled');
  }

  private enableLayer(layer: BasArea) {
    MapUtils.removeClass(layer, 'disabled');
  }
}