import {
  Component,
  ElementRef,
  ViewChild,
  OnInit,
  AfterViewInit,
  OnChanges,
  SimpleChanges,
  ViewEncapsulation,
  Input,
  EventEmitter,
  ChangeDetectionStrategy,
  NgZone
} from '@angular/core';
import * as L from 'leaflet';
import * as _ from 'lodash';
import { Observable } from 'rxjs/Observable';
import { Subscriber } from 'rxjs';
import { MdSidenav } from '@angular/material';
import { Store } from '@ngrx/store';

import {
  SelectionButtonControl
} from './leaflet-plugins/selection-button/selection-button.control';
import { AreaFeature, Building } from '../../models/building.interface';
import { ViewLevel } from './view-level.type';
import { Location } from '../../models/location.interface';
import { LayerControl } from './providers/layer-control.service';
import { BackButtonControl } from './leaflet-plugins/back-button/back-button.control';
import 'leaflet-compass/dist/leaflet-compass.min.js';
import { LayerSelector } from './providers/layer-selector.service';
import { RootState } from '../../redux/index';
import { StateSelectors } from '../../redux/selectors';
import { StateService } from './providers/state.service';
import { MarkerControl } from './providers/marker-control.service';

@Component({
  selector: 'bas-map',
  templateUrl: './bas-map.component.html',
  styleUrls: [
    './bas-map.component.scss'
  ],
  encapsulation: ViewEncapsulation.None,
  providers: [LayerControl, LayerSelector, StateService, MarkerControl],
})
export class BasMap implements AfterViewInit, OnInit {

  @ViewChild('mapTarget')
  public mapTarget: ElementRef;
  @ViewChild('sidenav')
  public sidenav: MdSidenav;

  private map: L.Map;
  private backButtonControl: L.Control;
  private selectionButtonControl: L.Control;

  public get selectedLocations() {
    return this.layerSelector.selectedLocations;
  }

  /**
   * @description back button is visible or not
   */
  public get backButtonIsVisible(): boolean {
    return !this.myState.selectionMode
      && _.isNumber(this.myState.currentLocation.parentID);
  }

  constructor(
    public myState: StateService,
    private layerControl: LayerControl,
    private layerSelector: LayerSelector,
    private markerControl: MarkerControl,
    private zone: NgZone,
    private store: Store< RootState>
  ) { }

  public ngOnInit() {
    this.myState.onStateChanged.subscribe((location) => {
      this._onStateChange();
    });
    this.myState.onSelectionModeChange.subscribe(() => {
      this.layerSelector.clear();
    });
    this.myState.onLayerChanged.subscribe(() => {
      this._updateView();
    });
    this.layerControl.onLayerClick.subscribe((layer) => {
      this._onLayerClick(layer);
    });
  }

  public ngAfterViewInit() {
    this.myState.onMapReady.subscribe(async () => {
      await this._init();
      this.layerControl.init();
      this.markerControl.init();
    });
    this.initMap();
  }

  public resizeMap() {
    let opt: L.ZoomPanOptions = {
      animate: true
    };
    this.map.invalidateSize(opt);
  }

  private async _init() {
    await this.myState.init();
  }

  private initMap() {
    this.map = L.map(this.mapTarget.nativeElement, {
      center: [
        30.28084740214,
        120.02401130217
      ],
      zoom: 18,
      maxZoom: 23,
      minZoom: 17
    });
    this.map.removeControl(this.map['zoomControl']);
    let CompassControl = L.Control['Compass'];
    this.backButtonControl = new BackButtonControl({ position: 'topleft' });
    this.selectionButtonControl = new SelectionButtonControl({ position: 'bottomright' });
    this.map.addControl(this.selectionButtonControl);
    this.map.on('level-back', async () => {
      await this.layerControl.goBack();
    });
    this.map.on('selection-mode-change', (event) => {
      this.myState.setSelectionMode(event['state']);
    });

    L.tileLayer(this.tileUrl, {
      maxZoom: 18,
      attribution: '',
      id: 'mapbox.streets'
    }).addTo(this.map);
    this.myState.setMap(this.map);
    this.myState.setMapState(true);
  }

  private _onLayerClick(feature: L.Layer) {
    let location: Location = feature['location'];
    if (this.myState.selectionMode) {
      this.layerSelector.toggleLayer(feature);
    } else {
      this.myState.setCurrentLocation(location);
    }
  }

  private _onStateChange() {
    if (!this.myState.currentLocation) {
      return;
    }
    if (this.backButtonControl) {
      if (this.backButtonIsVisible) {
        this.map.addControl(this.backButtonControl);
      } else {
        this.map.removeControl(this.backButtonControl);
      }
    }
  }

  private _updateView() {
    let bounds = this._findBounds();
    let center: L.LatLngExpression =
      [(bounds.top + bounds.bottom) / 2, (bounds.left + bounds.right) / 2];
    let zoom = this.findZoom();
    this.map.setView(center, zoom, {
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
    this.map.setMaxBounds(mapBounds);
  }

  private get tileUrl(): string{
    return 'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?'
      + 'access_token=pk.eyJ1IjoieXR5c3p4ZiIsImEiOiJjaXo'
      + '1OHN3OTcwNmJpMzNwaHVycmo5djllIn0.aBzti__T5lS8LDQhjyYsGA';
  }

  private findZoom() {
    if (!this.myState.currentLocation) {
      return 18;
    }
    let i = this.myState.path.length - 1;
    return 18 + i;
  }

  private _findBounds() {
    let left = null;
    let right = null;
    let top = null;
    let bottom = null;

    this.myState.currentLocation.subLocations.forEach((l) => {
      let child = this.myState.layers
        .find((f) => (f['location'] as Location).location === l.location);
      if (!child) {
        return;
      }
      if (left === null) {
        left = child.getBounds().getWest();
      } else if (left > child.getBounds().getWest()) {
        left = child.getBounds().getWest();
      }
      if (right === null) {
        right = child.getBounds().getEast();
      } else if (right < child.getBounds().getEast()) {
        right = child.getBounds().getEast();
      }
      if (top === null) {
        top = child.getBounds().getNorth();
      } else if (top > child.getBounds().getNorth()) {
        top = child.getBounds().getNorth();
      }
      if (bottom === null) {
        bottom = child.getBounds().getSouth();
      } else if (bottom < child.getBounds().getSouth()) {
        bottom = child.getBounds().getSouth();
      }
    });

    // no child layer found
    if (left === null) {
      let layer = this.myState.layers.find((f) => {
        return (f['location'] as Location).location === this.myState.currentLocation.location;
      });
      if (!layer) {
        let bounds = this.map.getBounds();
        return {
          left: bounds.getWest(),
          right: bounds.getEast(),
          top: bounds.getNorth(),
          bottom: bounds.getSouth()
        };
      }
      let bounds = layer.getBounds();
      left = bounds.getWest();
      top = bounds.getNorth();
      bottom = bounds.getSouth();
      right = bounds.getEast();
    }

    return {
      left, right, top, bottom
    };
  }
}
