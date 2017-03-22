import { Injectable } from '@angular/core';
import { Http, RequestOptionsArgs, Headers, Response } from '@angular/http';
import { ConfigHelper } from './helpers/config-helper';
import { RequestHelper } from './helpers/request-helper';
import { RESOURCE_URLS } from '../constants/resource-urls';
import { Observable } from 'rxjs';
import { BeehiveClient } from './helpers/beehive-client.service';

@Injectable()
export class DeviceService {

  constructor(
    private http: BeehiveClient,
    private configHelper: ConfigHelper,
    private requestHelper: RequestHelper) { }

  public fetchDevices(): Observable<Response> {
    let headers: Headers;
    let url = this.configHelper.buildUrl(RESOURCE_URLS.THING, ['types', 'Lighting']);
    let requestOptions: RequestOptionsArgs = {};
    return this.http
      .get(url, requestOptions).map((res) => res.json());
  }

  public fetchDevice(vendorThingID): Observable<Response> {
    let headers: Headers;
    let url = this.configHelper.buildUrl(RESOURCE_URLS.THING, ['vendorThingID', vendorThingID]);
    console.log('url', url);
    let requestOptions: RequestOptionsArgs = {};
    return this.http.get(url, requestOptions).map((res) => res.json());
  }

  public fetchStateHistory(id): Observable<Response> {
    let headers: Headers;
    let url = this.configHelper.buildUrl(RESOURCE_URLS.ES, ['historical']);
    let requestOptions = {
      dateField: 'state.date',
      orderField: 'state.date',
      startDate: 0,
      endDate: this.today,
      from: 0,
      order: 'desc',
      size: 20,
      indexType: '192b49ce',
      vendorThingID: id
    };
    return this.http.post(url, requestOptions).map((res) => res.json());
  }

  public fetchCommendHistory(id): Observable<Response> {
    let headers: Headers;
    let url = this.configHelper.buildUrl(RESOURCE_URLS.THING_IF, ['command', 'list']);
    let today = new Date().getTime();
    let requestOptions = {
      globalThingID: id,
      start: 0,
      end: this.today
    };
    return this.http.post(url, requestOptions).map((res) => res.json());
  }

  private get today() {
    return new Date().getTime();
  }
}
