import { Injectable } from '@angular/core';
import { Thing } from '../../models/thing.interface';
import { BasORM } from '../orm.service';
import { DeviceService } from '../../providers/resource-services/device.service';
import { LocationService } from '../../providers/resource-services/location.service';
import { LocationType } from '../../models/location-type.interface';
import { Location } from '../../models/location.interface';
import {
  LocationResponse
} from '../../providers/resource-services/interfaces/location-response.interface';
import { SqlHelper } from './sql-helper';

@Injectable()
export class SyncronizeService {

  private _locationsToStore: Location[];

  constructor(
    private _orm: BasORM,
    private _thingService: DeviceService,
    private _locationService: LocationService,
    private _sqlHelper: SqlHelper
  ) { }

  public async sync() {
    await this.syncThings();
    let locationTypes = await this.syncLocationType();
    await this.syncLocation(locationTypes);
  }

  /**
   * sync things to local db, subject to be replaced when sync logic is done
   *
   * @private
   * @returns
   *
   * @memberOf SyncronizeService
   */
  private async syncThings() {
    // tend to use timestamp instead after sync logic is done
    let thingRepo = this._orm.connection.getRepository(Thing);
    let result = await thingRepo.findAndCount();
    if (result[1] !== 0) { return; }
    let things = await this._thingService.getAllThings();

    let columns = [
      'id', 'createDate', 'modifyDate',
      'createBy', 'modifyBy', 'isDeleted', 'vendorThingID',
      'kiiAppID', 'type', 'fullKiiThingID', 'schemaName',
      'schemaVersion', 'kiiThingID'
    ];

    let rows = things.map((t) => columns.map((c) => t[c]));
    await this._sqlHelper.insertMultiRows('thing', columns, rows);
  }

  /**
   * sync locations, subject to be replaced when sync logic done
   *
   * @private
   * @param {LocationType[]} locationTypes
   *
   * @memberOf SyncronizeService
   */
  private async syncLocation(locationTypes: LocationType[]) {
    let locationRepo = this._orm.connection.getRepository(Location);
    let locationTree = await this._locationService
      .fetchLocations().toPromise();
    let result = await locationRepo.findOne(
      {
        where: {
          location: '.',
        },
        join: {
          alias: 'location',
          leftJoinAndSelect: {
            subLocations: 'location.subLocations'
          }
        }
      });
    console.log(result);
    if (result) { return; }
    this._locationsToStore = [];
    this.restructureLocation(locationTree, null, locationTypes);

    let columns = [
      'id', 'createDate', 'modifyDate', 'createBy',
      'modifyBy', 'isDeleted', 'location', 'geoPolygon', 'displayNameCN',
      'displayNameEN', 'order', 'parentID', 'locationType'
    ];
    let rows = this._locationsToStore
      .reverse()
      .map((d) => [
        d.id, d.createDate, d.modifyDate, d.createBy,
        d.modifyBy, d.isDeleted, d.location, d.geoPolygon, d.displayNameCN,
        d.displayNameEN, d.order, d.parentID, d.locationType.id
      ]);

    await this._sqlHelper.insertMultiRows('location', columns, rows);
    console.log('done');
  }

  /**
   * sync location type, subject to be replaced when sync logic is done.
   *
   * @private
   * @returns
   *
   * @memberOf SyncronizeService
   */
  private async syncLocationType() {
    let locationTypeRes = this._locationService.fetchLocationTypes();
    let locationTypeRepo = this._orm.connection.getRepository(LocationType);
    return await locationTypeRepo.persist(locationTypeRes.map((typeRes) => {
      let _t = new LocationType();
      Object.assign(_t, typeRes);
      return _t;
    }));
  }

  /**
   * restructure beehive location tree to fit bas location data structure
   * subject to be replaced when relevant api is done.
   *
   * @private
   * @param {LocationResponse} locationResponse
   * @param {Location} parent
   * @param {LocationType[]} locationTypes
   * @returns
   *
   * @memberOf SyncronizeService
   */
  private restructureLocation(
    locationResponse: LocationResponse,
    parent: Location,
    locationTypes: LocationType[]
  ) {
    let location = new Location();
    Object.assign(location, locationResponse, {
      id: this._locationsToStore.length,
      parent: parent,
      order: 0,
      description: {
        displayNameCN: locationResponse.location.substr(locationResponse.location.length - 2, 2),
        displayNameEN: locationResponse.location.substr(locationResponse.location.length - 2, 2)
      },
      createDate: 0,
      modifyDate: 0,
      createBy: 0,
      modifyBy: 0,
      isDeleted: 0,
      geoPolygon: '',
      parentID: !parent ? 'NULL' : parent.id
    });
    switch (locationResponse.locationLevel) {
      case undefined:
        location.locationType = locationTypes.find((t) => t.level === 1);
        break;
      case 'building':
        location.locationType = locationTypes.find((t) => t.level === 2);
        break;
      case 'floor':
        location.locationType = locationTypes.find((t) => t.level === 3);
        break;
      case 'partition':
        location.locationType = locationTypes.find((t) => t.level === 4);
        break;
      case 'area':
        location.locationType = locationTypes.find((t) => t.level === 5);
        break;
      case 'site':
        location.locationType = locationTypes.find((t) => t.level === 6);
        break;
      default:
        break;
    }
    this._locationsToStore.push(location);

    location.subLocations = Object.keys(locationResponse.subLocations)
      .map((key) => {
        return this.restructureLocation(
          locationResponse.subLocations[key], location, locationTypes);
      })
      .sort((a, b) => {
        return a.location < b.location ? -1 : 1;
      });

    return location;
  }
}
