import { Headers, Http, RequestOptionsArgs, Response } from '@angular/http';

import { BeehiveClient } from './helpers/beehive-client.service';
import { ConfigHelper } from './helpers/config-helper';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RESOURCE_URLS } from '../constants/resource-urls';
import { RequestHelper } from './helpers/request-helper';
import { Thing } from './../models/thing.interface';

@Injectable()
export class DeviceService {

  constructor(
    private http: BeehiveClient,
    private configHelper: ConfigHelper,
    private requestHelper: RequestHelper) { }

  /**
   * get things by type
   *
   * @param {string} type
   * @returns {Observable<Thing>}
   *
   * @memberOf ThingService
   */
  public fetchDevicesByType(type: string): Observable<Thing[]> {
    let url = this.configHelper.buildUrl(RESOURCE_URLS.TYPE, [type]);
    let requestOptions: RequestOptionsArgs = {};
    return this.http.get(url, requestOptions).map((res: Response) => res.json());
  }

  /**
   * get all lightings
   *
   * @returns {Observable<Thing[]>}
   *
   * @memberOf DeviceService
   */
  public fetchLightings(): Observable<Thing[]> {
    return this.fetchDevicesByType('Lighting');
  }

  /**
   * get device by vendorThingID
   *
   * @param {string} vendorThingID
   * @returns {Observable<Response>}
   *
   * @memberOf DeviceService
   */
  public fetchDeviceByVendorThingID(vendorThingID: string): Observable<Response> {
    let headers: Headers;
    let url = this.configHelper.buildUrl(RESOURCE_URLS.THING, ['vendorThingID', vendorThingID]);
    let requestOptions: RequestOptionsArgs = {};
    return this.http.get(url, requestOptions).map((res) => res.json());
  }

  /**
   * get state history by vendorThingID
   *
   * @param {string} vendorThingID
   * @returns {Observable<Response>}
   *
   * @memberOf DeviceService
   */
  public fetchStateHistoryByVendorThingID(vendorThingID: string): Observable<Response> {
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
      vendorThingID: vendorThingID
    };
    return this.http.post(url, requestOptions).map((res) => res.json());
  }

  /**
   * get command history by globalThingID
   *
   * @param {string} globalThingID
   * @returns {Observable<Response>}
   *
   * @memberOf DeviceService
   */
  public fetchCommendHistoryByGlobalThingID(globalThingID: string): Observable<Response> {
    let headers: Headers;
    let url = this.configHelper.buildUrl(RESOURCE_URLS.THING_IF, ['command', 'list']);
    let today = new Date().getTime();
    let requestOptions = {
      globalThingID: globalThingID,
      start: 0,
      end: this.today
    };
    return this.http.post(url, requestOptions).map((res) => res.json());
  }

  private get today() {
    return new Date().getTime();
  }
}
