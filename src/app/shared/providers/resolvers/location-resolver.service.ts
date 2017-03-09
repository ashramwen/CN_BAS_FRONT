import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { ContactsService } from './contacts.service';
import { Location } from '../../models/location.interface';
import { LocationService } from '../location.service';

@Injectable()
export class LocationResolver implements Resolve<Location> {

  constructor(private locationService: LocationService) {}

  public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.locationService.fetchLocations()
      .map(res => {
        return res.json();
      });
  }
}
