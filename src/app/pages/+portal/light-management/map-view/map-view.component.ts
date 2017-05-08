import { Component, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { RootState } from '../../../../shared/redux/index';
import { LogOutAction } from '../../../../shared/redux/token/actions';
import { SessionService } from '../../../../shared/providers/session.service';
import { StateSelectors } from '../../../../shared/redux/selectors';
import { MapService } from '../../../../shared/providers/map.service';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute } from '@angular/router';
import { Building } from '../../../../shared/models/building.interface';
import { Location } from '../../../../shared/models/location.interface';
import { BasMap } from '../../../../shared/components/bas-map/bas-map.component';

@Component({
  selector: 'bas-map-view',
  templateUrl: './map-view.component.html',
  styles: [
    `
    
    `
  ]
})
export class MapViewCmp implements OnInit {

  @ViewChild(BasMap)
  public map: BasMap;

  constructor(
    private store: Store<RootState>,
    private mapService: MapService,
    private route: ActivatedRoute
  ) { }

  public ngOnInit() {

    this.store.select(StateSelectors.global)
      .subscribe((globalState) => {
        let buildings = this.route.snapshot.data['buildings'];
        let locationTree = globalState.locations;
        this.map.init(buildings, locationTree);
      });
  }
}
