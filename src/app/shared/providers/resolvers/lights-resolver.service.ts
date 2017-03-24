import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';

import { DeviceService } from './../device.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Response } from '@angular/http';
import { Thing } from './../../models/thing.interface';

@Injectable()
export class LightsResolver implements Resolve<Thing[]> {

  constructor(private deviceService: DeviceService) { }

  public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.deviceService.fetchLightings();
  }

}
