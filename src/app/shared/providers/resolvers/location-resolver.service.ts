import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { ContactsService } from './contacts.service';
import { Location } from '../../models/location.interface';
import { LocationService } from '../location.service';

interface LocationResponse {
  location: string;
  locationLevel: string;
  subLocations: { [subLocation: string]: LocationResponse };
}

@Injectable()
export class LocationResolver implements Resolve<Location> {

  constructor(private locationService: LocationService) {}

  public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.locationService.fetchLocations()
      .map(res => {
        let locationResponse: LocationResponse = res.json();
        return this.restructureLocation(locationResponse, null);
      });
  }

  private restructureLocation(
    locationResponse: LocationResponse,
    parent: Location,
  ) {
    let location: Location = {
      location: locationResponse.location,
      locationName: this.removeSymbol(locationResponse.location.substr(parent ? parent.location.length - 1 : 0)),
      subLocations: [],
      locationLevel: locationResponse.locationLevel
    };

    location.subLocations = Object.keys(locationResponse.subLocations)
      .map(key => {
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
