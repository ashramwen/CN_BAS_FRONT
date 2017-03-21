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
} from '@angular/core';
import * as L from 'leaflet';
import { AreaFeature, Building } from '../../models/building.interface';
import { Observable } from 'rxjs/Observable';
import { Subscriber } from 'rxjs';
import { ViewLevel } from './view-level.type';
import { Location } from '../../models/location.interface';
import { LayerControl } from './providers/layer-control.service';
import { ChangeDetectionStrategy } from '@angular/core';
import { BackButtonControl } from './leaflet-plugins/back-button/back-button.control';
import 'leaflet-compass/dist/leaflet-compass.min.js';
import {
  SelectionButtonControl
} from './leaflet-plugins/selection-button/selection-button.control';

@Component({
  selector: 'bas-map',
  templateUrl: './bas-map.component.html',
  styleUrls: [
    './bas-map.component.scss'
  ],
  encapsulation: ViewEncapsulation.None,
  providers: [LayerControl],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BasMap implements AfterViewInit, OnInit {

  @ViewChild('mapTarget')
  public mapTarget: ElementRef;
  @Input()
  public geoData: Building[];
  @Input()
  public locationTree: Location;

  private mapReady: boolean = false;
  private map: L.Map;
  private featureLayers: L.Polygon[] = [];
  private currentLocation: Location;
  private mapState: EventEmitter<boolean> = new EventEmitter();
  private backButtonControl: L.Control;
  private selectionButtonControl: L.Control;
  private selectionMode: boolean = false;

  constructor(
    private layerControl: LayerControl
  ) { }

  public ngOnInit() {
    this.layerControl.locationChangeEvent.subscribe((location) => {
      this.currentLocation = location;
      this.onLocationChange();
    });
  }

  public ngAfterViewInit() {
    this.initMap();
  }

  public init(locationTree: Location, geoData: Building[]) {
    this.locationTree = locationTree;
    this.geoData = geoData;
    this.currentLocation = this.locationTree;
    this.mapState.subscribe(() => {
      this.loadBuildingFeatures();
      this.layerControl.init(this.geoData, this.locationTree, this.featureLayers);
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
      this.updateView();
    });
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
      this.selectionMode = event['state'];
    });

    L.tileLayer(this.tileUrl, {
      maxZoom: 18,
      attribution: '',
      id: 'mapbox.streets'
    }).addTo(this.map);
    this.mapReady = true;
    this.mapState.next(true);
  }

  private loadBuildingFeatures() {
    this.featureLayers = this.geoData
      .reduce((s: AreaFeature[], d) => {
        return s.concat(d.data);
      }, [])
      .map((d) => {
        let layerOptions: L.PolylineOptions = {
          fillColor: 'grey'
        };

        let feature = L.polygon(d.geometry.coordinates[0], layerOptions)
          .addTo(this.map)
          .on('click', (event) => {
            this.onLayerClick(feature);
          })
          .on('mouseover', (event) => {
            feature.setStyle({
              fillColor: 'red'
            });
          })
          .on('mouseout', (event) => {
            feature.setStyle({
              fillColor: 'grey'
            });
          });

        feature.feature = d;
        return feature;
      });
  }

  private onLayerClick(feature: L.Polygon) {
    let locationID = (<AreaFeature>feature.feature).properties.tag;
    if (this.selectionMode) {
      
    } else {
      this.layerControl.setLocation(locationID);
    }
  }

  private onLocationChange() {
    if (!this.currentLocation) {
      return;
    }
    if (this.backButtonControl) {
      if (this.layerControl.backButtonIsVisible) {
        this.map.addControl(this.backButtonControl);
      } else {
        this.map.removeControl(this.backButtonControl);
      }
    }
    this.updateView();
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
    if (!this.currentLocation) {
      return 18;
    }
    switch (this.currentLocation.locationLevel) {
      case 'floor':
        return 19;
      case 'partition':
        return 20;
      case 'site':
      case 'area':
        return 22;
      default:
        return 18;
    }
  }

  private findBounds() {
    let left = null;
    let right = null;
    let top = null;
    let bottom = null;

    this.currentLocation.subLocations.forEach((l) => {
      let child = this.featureLayers
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
      let layer = this.featureLayers.find((f) => {
        return (<AreaFeature> f.feature).properties.tag === this.currentLocation.location;
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
