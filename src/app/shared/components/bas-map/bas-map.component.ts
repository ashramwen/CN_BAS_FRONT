import {
  Component,
  ElementRef,
  ViewChild,
  OnInit,
  AfterViewInit,
  OnChanges,
  SimpleChanges
} from '@angular/core';
import { ViewEncapsulation, Input } from '@angular/core';
import * as L from 'leaflet';
import { AreaFeature } from '../../models/building.interface';
import { Observable } from 'rxjs/Observable';
import { Subscriber } from 'rxjs';

@Component({
  selector: 'bas-map',
  templateUrl: './bas-map.component.html',
  styleUrls: [
    './bas-map.component.scss'
  ],
  encapsulation: ViewEncapsulation.None
})
export class BasMap implements AfterViewInit, OnChanges {

  @ViewChild('mapTarget')
  public mapTarget: ElementRef;
  @Input()
  public geoData: AreaFeature[];

  private map: L.Map;
  private mapStateSender: Subscriber<boolean>;
  private mapState: Observable<boolean> =
    new Observable((subscriber: Subscriber<any>) => {
      this.mapStateSender = subscriber;
  });

  public ngAfterViewInit() {
    this.initMap();
  }

  public ngOnChanges(changes: SimpleChanges) {
    if (changes['geoData']
      && changes['geoData'].previousValue !== changes['geoData'].currentValue
    ) {
      this.mapState.subscribe(() => {
        this.loadBuildingFeatures();
      });
    }
  }

  private initMap() {
    this.map = L.map(this.mapTarget.nativeElement, {
      center: [
        30.28084740214,
        120.02401130217
      ],
      zoom: 18,
      maxZoom: 30,
      minZoom: 16
    });

    L.tileLayer(this.tileUrl, {
      maxZoom: 18,
      attribution: '',
      id: 'mapbox.streets'
    }).addTo(this.map);
    this.mapStateSender.next(true);
  }

  private loadBuildingFeatures() {
    this.geoData.map((d) => {
      let layerOptions: L.PolylineOptions = {
        fillColor: 'black'
      };

      let feature = L.polygon(d.geometry.coordinates[0], layerOptions)
        .addTo(this.map)
        .on('mouseover', (event) => {
          feature.setStyle({
            fill: true,
            fillColor: 'red'
          });
        })
        .on('mouseout', (event) => {
          feature.setStyle({
            fill: true,
            fillColor: 'grey'
          });
        });
    });
  }

  private get tileUrl(): string{
    return 'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?'
      + 'access_token=pk.eyJ1IjoieXR5c3p4ZiIsImEiOiJjaXo'
      + '1OHN3OTcwNmJpMzNwaHVycmo5djllIn0.aBzti__T5lS8LDQhjyYsGA';
  }
}
