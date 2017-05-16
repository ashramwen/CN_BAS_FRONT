import { Injectable } from '@angular/core';
import { BasORM } from '../../orm/orm.service';
import { Location } from '../../models/location.interface';
import * as _ from 'lodash';

@Injectable()
export class LocationService {

  constructor(
    private _orm: BasORM
  ) { }

  public get root() {
    return this.getLocation('.');
  }

  public async getDescendants(location: string) {
    let repo = this._orm.locationRepo;
    return await repo.createQueryBuilder('location')
      .where('location.location LIKE :keyword', { keyword: `${location}%` })
      .getMany();
  }

  public async getLocation(location: string) {
    return await this._locationSelectors
      .where('location.location=:location')
      .addParameters({ location })
      .getOne();
  }

  public async getSubLocations(location: Location) {
    return await this._locationSelectors
      .where('location.parentID=:id')
      .addParameters({ id: location.id })
      .getMany();
  }

  public async getParentLocation(location: Location) {
    return await this._locationSelectors
      .where('location.id=:id')
      .addParameters({ id: location.parentID })
      .getOne();
  }

  public async getLocationPath(location: Location | string): Promise<Location[]> {
    try {
      if (!location) { return []; }
      let _location: string = _.isString(location) ? location : location.location;
      return await this._locationSelectors
        .where(`:location LIKE (location.location || "%")`, { location: _location })
        .orderBy('location.level', 'ASC')
        .getMany();
    } catch (e) {
      console.log(e);
    }
  }

  public async isCascade(location: Location) {
    return await this._orm.locationRepo
      .createQueryBuilder('location')
      .innerJoin('locationType', 'locationType', 'locationType.id = location.locationType')
      .where(`locationType.expendAll = 0 
        and location.location LIKE (:location || "%")`, { location: location.location })
      .getCount() > 0;
  }

  public async isLeaf(location: Location) {
    let subLocations = await this.getSubLocations(location);
    return !subLocations.length;
  }

  private get _locationSelectors() {
    return this._orm.locationRepo
      .createQueryBuilder('location')
      .innerJoinAndSelect('location.locationType', 'locationType')
      .leftJoinAndSelect('location.subLocations', 'subLocations')
      .orderBy('`subLocations_order`', 'DESC');
  }
}
