import { Injectable, OnInit } from '@angular/core';
import { MapUtils } from '../utils';
import { AreaFeature } from '../../../models/building.interface';
import { Location } from '../../../models/location.interface';
import { Store } from '@ngrx/store';
import { RootState } from '../../../redux/index';
import { StateSelectors } from '../../../redux/selectors';

@Injectable()
export class LayerSelector {

  public locationTree: Location;
    
  private _selectedLayers: L.Polygon[] = [];
  private _selectedLocation: { [location: string]: Location } = {};

  constructor(
    private store: Store<RootState>
  ) { 
    store.select(StateSelectors.location)
      .subscribe((locationState) => {
        this.locationTree = locationState.locations;
      });
  }

  public get selectedLocations(): Location[] {
    return Object.keys(this._selectedLocation)
      .map((key) => this._selectedLocation[key]);
  }

  public toggleLayer(layer) {
    this.layerIsSelected(layer) ? this.deselectLayer(layer) :
      this.selectLayer(layer);
  }

  public selectLayer(layer: L.Polygon) {
    this._selectedLayers.push(layer);
    this.highlight(layer);
    let location = (<AreaFeature>layer.feature).properties.tag;
    this._selectedLocation[location]
      = MapUtils.findLocation(location, this.locationTree);
  }

  public deselectLayer(layer: L.Polygon) {
    this._selectedLayers.splice(this._selectedLayers.indexOf(layer), 1);
    this.fade(layer);
    let location = (<AreaFeature>layer.feature).properties.tag;
    delete this._selectedLocation[location];
  }

  public layerIsSelected(layer: L.Polygon): boolean {
    return this._selectedLayers.indexOf(layer) > -1;
  }

  public clear() {
    this._selectedLayers = this._selectedLayers || [];
    this._selectedLayers.forEach((l) => this.fade(l));
    this._selectedLayers = [];
    this._selectedLocation = {};
  }

  private highlight(layer: L.Polygon) {
    MapUtils.addClass(layer, 'selected');
  }

  private fade(layer: L.Polygon) {
    MapUtils.removeClass(layer, 'selected');
  }
}
