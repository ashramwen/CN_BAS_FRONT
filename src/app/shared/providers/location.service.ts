import { Injectable } from '@angular/core';
import { Http, RequestOptionsArgs, Headers, Response } from '@angular/http';
import { ConfigHelper } from './helpers/config-helper';
import { RequestHelper } from './helpers/request-helper';
import { RESOURCE_URLS } from '../constants/resource-urls';
import { Observable } from 'rxjs';

@Injectable()
export class LocationService {

  constructor(
    private http: Http,
    private configHelper: ConfigHelper,
    private requestHelper: RequestHelper
  ) { }

  /**
   * @desc get locations
   * @return {Observable<Response>} location Observable
   */
  public fetchLocations(): Observable<Response> {
    let headers: Headers;
    this.requestHelper.headersWithToken.subscribe((_headers) => {
      headers = _headers;
    });
    let url = this.configHelper.buildUrl(RESOURCE_URLS.LOCATION_TAGS, ['fullTree']);
    let requestOptions: RequestOptionsArgs = {
      headers: headers
    };

    return this.http
      .get(url, requestOptions);
  }
}
