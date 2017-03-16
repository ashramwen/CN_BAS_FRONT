import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AreaFeature } from '../models/building.interface';

@Injectable()
export class MapService {

  public getBuildingGeo(): Observable<AreaFeature[]> {
    return Observable
      .of(require('../../../assets/mock-data/new.geojson'))
      .map((r: AreaFeature[]) => {
        r.forEach((f) => {
          f.geometry.coordinates[0]
            .forEach((point) => {
              let temp = point[1];
              point[1] = point[0];
              point[0] = temp;
            });
        });
        return r;
      });
  }
}
