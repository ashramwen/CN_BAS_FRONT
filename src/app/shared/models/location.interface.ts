import { SyncRecord } from './sync_record.interface';
import { LocationType } from './location-type.interface';
import {
  ConnectionOptions,
  createConnection,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
} from 'bas-typeorm';

// export type LocationLevel = undefined | 'building' | 'floor' | 'partition' | 'area' | 'site';

// export interface Location {
//   location: string;
//   locationName: string;
//   locationLevel: LocationLevel;
//   parent: Location;
//   fullName: string;
//   subLocations: Location[];
// }

@Entity()
export class Location implements SyncRecord {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public createDate: number;

  @Column()
  public modifyDate: number;

  @Column()
  public createBy: string;

  @Column()
  public modifyBy: string;

  @Column()
  public isDeleted: boolean;

  @Column()
  public location: string;

  @Column()
  public geoPolygon: string;

  @Column()
  public displayNameCN: string;

  @Column()
  public displayNameEN: string;

  @Column()
  public order: number;

  @ManyToOne((type) => Location, (location) => location.subLocations)
  public parentID: number;

  @OneToMany((type) => Location, (location) => location.parentID)
  public subLocations: Location[];

  @ManyToOne((type) => LocationType, (locationType) => locationType.locations)
  public locationType: LocationType;

  public set description(value) {
    if (!value) {
      this.displayNameCN = '';
      this.displayNameEN = '';
    } else {
      this.displayNameCN = value['displayNameCN'];
      this.displayNameEN = value['displayNameEN'];
    }
  }

  public parent: Location;
}
