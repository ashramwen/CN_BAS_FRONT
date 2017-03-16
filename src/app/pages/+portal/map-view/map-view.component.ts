import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { RootState } from '../../../shared/redux/index';
import { LogOutAction } from '../../../shared/redux/token/actions';
import { SessionService } from '../../../shared/providers/session.service';
import { StateSelectors } from '../../../shared/redux/selectors';
import { MapService } from '../../../shared/providers/map.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'bas-map-view',
  templateUrl: './map-view.component.html',
  styles: [
    `
    
    `
  ]
})
export class MapViewCmp {

  constructor(
    private store: Store<RootState>,
    private mapService: MapService
  ) { }

  public get mapGeo$(): Observable<any> {
    return this.mapService.getBuildingGeo();
  }

}
