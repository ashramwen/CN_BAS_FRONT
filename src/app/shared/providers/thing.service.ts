import { Headers, Http, RequestOptionsArgs, Response } from '@angular/http';
import { Status, Thing } from './../models/thing.interface';

import { BeehiveClient } from './helpers/beehive-client.service';
import { ConfigHelper } from './helpers/config-helper';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RESOURCE_URLS } from './../constants/resource-urls';
import { RequestHelper } from './helpers/request-helper';

@Injectable()
export class ThingService {

  constructor(
    private http: BeehiveClient,
    private configHelper: ConfigHelper,
    private requestHelper: RequestHelper,
  ) { }

  /**
   * get all lightings
   *
   * @returns {Observable<Response>}
   *
   * @memberOf ThingService
   */
  public getLightings(): Observable<Thing[]> {
    return this.getThingsByType('Lighting');
  }

  /**
   * get things by type
   *
   * @param {string} type
   * @returns {Observable<Thing>}
   *
   * @memberOf ThingService
   */
  public getThingsByType(type: string): Observable<Thing[]> {
    let url = this.configHelper.buildUrl(RESOURCE_URLS.TYPE, [type]);
    let requestOptions: RequestOptionsArgs = {};

    return this.http.get(url, requestOptions).map((res: Response) => res.json());
  }
}
