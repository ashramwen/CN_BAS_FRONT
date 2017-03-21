import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Response } from '@angular/http';
import { Thing } from './../../models/thing.interface';
import { ThingService } from './../thing.service';

@Injectable()
export class ThingResolver implements Resolve<any> {

  constructor(private thingService: ThingService) { }

  public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.thingService.getLightings()
      .map((thing: Thing[]) => {
        return thing.map((o: Thing) => o.vendorThingID);
      })
      .toArray();
  }

}
