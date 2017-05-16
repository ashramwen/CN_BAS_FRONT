import { Injectable, OnInit } from '@angular/core';
import { MapUtils } from '../utils';
import { AreaFeature } from '../../../models/building.interface';
import { Location } from '../../../models/location.interface';
import { Store } from '@ngrx/store';
import { RootState } from '../../../redux/index';
import { StateSelectors } from '../../../redux/selectors';
import { StateService } from './state.service';
import { BMLocation } from '../../map-view/models/location.interface';

@Injectable()
export class LocationSelector {

  private _selectedLocations: Location[] = [];

  constructor(
    private myState: StateService
  ) { 
    myState.onSelectionModeChange.subscribe(() => {
      this._selectedLocations = [];
    });
    myState.onIsLocationSelectorChange.subscribe(() => {
      this._selectedLocations = [];
    });
  }

  public get selectedLocations(): Location[] {
    return this._selectedLocations;
  }

  public toggleLocation(location: BMLocation) {
    if (location.selected) {
      this.deselectLocation(location);
    } else {
      this.selectLocation(location);
    }
  }

  public selectLocation(location: BMLocation) {
    location.selected = true;
    this._selectedLocations.push(location);
  }

  public deselectLocation(location: BMLocation) {
    location.selected = false;
    this._selectedLocations.splice(this._selectedLocations.indexOf(location), 1);

    // invoke change
    this.myState.setLocations(this.myState.locations.concat([]));
  }
}
