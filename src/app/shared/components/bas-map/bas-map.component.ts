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

@Component({
  selector: 'bas-map',
  templateUrl: './bas-map.component.html',
  styleUrls: [
    './bas-map.component.scss'
  ],
  encapsulation: ViewEncapsulation.None,
  providers: [LayerControl, LayerSelector, StateService],
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
    return !!this.myState.currentLocation.parent;
  }

  constructor(
    public myState: StateService,
    private layerControl: LayerControl,
    private layerSelector: LayerSelector,
    private zone: NgZone,
    private store: Store< RootState>
  ) { }

  public ngOnInit() {
    this.myState.onCurrentLocationChange.subscribe((location) => {
      this.onLocationChange();
    });
    this.myState.onLayerLoad.subscribe(() => {
      this.layerControl.init();
    });
    this.myState.onSelectionModeChange.subscribe(() => {
      this.layerSelector.clear();
      // if (this.myState.selectionMode) {
      //   this.sidenav.open().then(() => {
      //     this.resizeMap();
      //   });
      // } else {
      //   this.sidenav.close().then(() => {
      //     this.resizeMap();
      //   });
      // }
    });
  }

  public ngAfterViewInit() {
    this.initMap();
  }

  public init(geoData: Building[], locationTree: Location) {
    this.myState.init(locationTree, geoData);
    this.myState.onMapReady.subscribe((state) => {
      if (!state) {
        return;
      }
      let layers = this.loadBuildingFeatures();
      this.myState.loadLayer(layers);
      let bounds = this.findBounds();
      let mapBounds
        = new L.LatLngBounds([
          bounds.bottom + 0.001,
          bounds.left - 0.001
        ], [
          bounds.top - 0.001,
          bounds.right + 0.001
        ]);
      this.map.setMaxBounds(mapBounds);
    });
  }

  public resizeMap() {
    let opt: L.ZoomPanOptions = {
      animate: true
    };
    this.map.invalidateSize(opt);
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
    window['map'] = this.map;
    this.map.removeControl(this.map['zoomControl']);
    let CompassControl = L.Control['Compass'];
    this.backButtonControl = new BackButtonControl({ position: 'topleft' });
    this.selectionButtonControl = new SelectionButtonControl({ position: 'bottomright' });
    this.map.addControl(this.selectionButtonControl);
    this.map.on('level-back', () => {
      this.layerControl.goBack();
    });
    this.map.on('selection-mode-change', (event) => {
      this.myState.setSelectionMode(event['state']);
    });

    L.tileLayer(this.tileUrl, {
      maxZoom: 18,
      attribution: '',
      id: 'mapbox.streets'
    }).addTo(this.map);
    this.myState.setMapState(true);
  }

  private loadBuildingFeatures() {
    let featureLayers = this.myState.geoData
      .reduce((s: AreaFeature[], d) => {
        return s.concat(d.data);
      }, [])
      .map((l) => this.initFeature(l));
    featureLayers.forEach((f) => {
      f.addTo(this.map);
    });

    return featureLayers;
  }

  private onLayerClick(feature: L.Polygon) {
    let locationID = (<AreaFeature> feature.feature).properties.tag;
    if (this.myState.selectionMode) {
      this.layerSelector.toggleLayer(feature);
    } else {
      this.layerControl.setLocation(locationID);
    }
  }

  private onLocationChange() {
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
    this.updateView();
  }

  private initFeature(d: AreaFeature) {
    let layerOptions: L.PolylineOptions = {
      className: 'loc-layer'
    };

    let feature = L.polygon(d.geometry.coordinates[0], layerOptions)
      .on('click', (event) => {
        this.onLayerClick(feature);
      });
    feature.feature = d;
    return feature;
  }

  private updateView() {
    let bounds = this.findBounds();
    let center: L.LatLngExpression =
      [(bounds.top + bounds.bottom) / 2, (bounds.left + bounds.right) / 2];
    let zoom = this.findZoom();
    this.map.setView(center, zoom, {
      animate: true
    });
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
    let i = 0;
    let location = this.myState.currentLocation;
    while (!!location.parent) {
      location = location.parent;
      i++;
    }
    return 18 + i;
  }

  private findBounds() {
    let left = null;
    let right = null;
    let top = null;
    let bottom = null;

    this.myState.currentLocation.subLocations.forEach((l) => {
      let child = this.myState.layers
        .find((f) => (<AreaFeature> f.feature).properties.tag === l.location);
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
        return (<AreaFeature> f.feature).properties.tag === this.myState.currentLocation.location;
      });
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
