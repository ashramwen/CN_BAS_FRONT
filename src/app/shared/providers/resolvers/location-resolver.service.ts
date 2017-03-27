import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { ContactsService } from './contacts.service';
import { Location, LocationLevel } from '../../models/location.interface';
import { LocationService } from '../location.service';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { RootState } from '../../redux/index';
import { AddAction } from '../../redux/location/actions';
import { StateSelectors } from '../../redux/selectors';
import { createSelector } from 'reselect';
import { LocationState } from '../../redux/location/reducer';
import { TranslateService } from '@ngx-translate/core';

interface LocationResponse {
  location: string;
  locationLevel: LocationLevel;
  subLocations: { [subLocation: string]: LocationResponse };
}

@Injectable()
export class LocationResolver implements Resolve<Observable<Location>> {

  constructor(
    private locationService: LocationService,
    private store: Store<RootState>,
    private translate: TranslateService
  ) { }

  public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.locationService.fetchLocations()
      .map((res) => {
        let locationResponse: LocationResponse = res.json();
        let location = this.restructureLocation(locationResponse, null);
        this.store.dispatch(new AddAction(location));
        return this.store.select(createSelector(StateSelectors.location,
          (_state: LocationState) => {
            return _state.locations;
          }));
      });
  }

  private restructureLocation(
    locationResponse: LocationResponse,
    parent: Location,
  ) {
    let location: Location = {
      location: locationResponse.location,
      locationName: this.removeSymbol(
        locationResponse.location.substr(parent ?
          ((!parent.locationLevel) ? parent.location.length - 1 : parent.location.length)
          : 0)),
      subLocations: [],
      locationLevel: locationResponse.locationLevel,
      parent: parent,
      fullName: parent ? parent.fullName : ''
    };

    this.translate.get('location.' + (location.locationLevel || 'empty'), {
      value: location.locationName
    }).subscribe((name) => {
      location.fullName = (!parent || !parent.fullName) ?
        `${name}` : parent.fullName + ` ${name}`;
    });

    location.subLocations = Object.keys(locationResponse.subLocations)
      .map((key) => {
        return this.restructureLocation(locationResponse.subLocations[key], location);
      })
      .sort((a, b) => {
        return a.locationName < b.locationName ? -1 : 1;
      });

    return location;
  }

  private removeSymbol(str: string) {
    return str.replace(/-/, '');
  }
}
