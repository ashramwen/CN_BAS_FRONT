import { Injectable } from '@angular/core';
import { Http, RequestOptionsArgs, Headers } from '@angular/http';
import { ConfigHelper } from './helpers/config-helper';
import { RequestHelper } from './helpers/request-helper';
import { RESOURCE_URLS } from '../constants/resource-urls';

@Injectable()
export class LocationService {

  constructor(
    private http: Http,
    private configHelper: ConfigHelper,
    private requestHelper: RequestHelper
  ) { }

  public fetchLocations() {
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
