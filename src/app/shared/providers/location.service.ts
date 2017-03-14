import { Injectable } from '@angular/core';
import { Http, RequestOptionsArgs, Headers, Response } from '@angular/http';
import { ConfigHelper } from './helpers/config-helper';
import { RequestHelper } from './helpers/request-helper';
import { RESOURCE_URLS } from '../constants/resource-urls';
import { Observable } from 'rxjs';
import { BeehiveClient } from './helpers/beehive-client.service';

@Injectable()
export class LocationService {

  constructor(
    private http: BeehiveClient,
    private configHelper: ConfigHelper,
    private requestHelper: RequestHelper,
  ) { }

  /**
   * @desc get locations
   * @return {Observable<Response>} location Observable
   */
  public fetchLocations(): Observable<Response> {
    let headers: Headers;
    let url = this.configHelper.buildUrl(RESOURCE_URLS.LOCATION_TAGS, ['fullTree']);
    let requestOptions: RequestOptionsArgs = {};

    return this.http
      .get(url, requestOptions);
  }
}
