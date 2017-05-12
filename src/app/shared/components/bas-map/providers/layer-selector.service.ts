import { Injectable, OnInit } from '@angular/core';
import { MapUtils } from '../utils';
import { AreaFeature } from '../../../models/building.interface';
import { Location } from '../../../models/location.interface';
import { Store } from '@ngrx/store';
import { RootState } from '../../../redux/index';
import { StateSelectors } from '../../../redux/selectors';
import { StateService } from './state.service';

@Injectable()
export class LayerSelector {

  private _selectedLayers: L.Layer[] = [];
  private _selectedLocation: Location[] = [];

  constructor(
    private myState: StateService
  ) { }

  public get selectedLocations(): Location[] {
    return this._selectedLocation;
  }

  public deselectLocation(location: Location) {
    let index = this._selectedLocation.findIndex((l) => l.location === location.location);
    this.deselectLayer(this._selectedLayers[index]);
  }

  public toggleLayer(layer: L.Layer) {
    this.layerIsSelected(layer) ? this.deselectLayer(layer) :
      this.selectLayer(layer);
  }

  public selectLayer(layer: L.Layer) {
    this._selectedLayers.push(layer);
    this.highlight(layer);
    let location: Location = layer['location'];
    this._selectedLocation = this._selectedLocation.concat([location]);
  }

  public deselectLayer(layer: L.Layer) {
    this._selectedLayers.splice(this._selectedLayers.indexOf(layer), 1);
    this.fade(layer);
    let location: Location = layer['location'];
    this._selectedLocation = this._selectedLocation.filter((l) => l.location !== location.location);
  }

  public layerIsSelected(layer: L.Layer): boolean {
    return this._selectedLayers.indexOf(layer) > -1;
  }

  public clear() {
    this._selectedLayers = this._selectedLayers || [];
    this._selectedLayers.forEach((l) => this.fade(l));
    this._selectedLayers = [];
    this._selectedLocation = [];
  }

  private highlight(layer: L.Layer) {
    MapUtils.addClass(<L.Polygon> layer, 'selected');
  }

  private fade(layer: L.Layer) {
    MapUtils.removeClass(<L.Polygon> layer, 'selected');
  }
}
