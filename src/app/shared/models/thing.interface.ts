import { ThingState } from './thing-state.interface';
import { SyncRecord } from './sync_record.interface';

import {
  ConnectionOptions,
  createConnection,
  Entity,
  PrimaryGeneratedColumn,
  Column
} from 'bas-typeorm';

@Entity()
export class Thing implements SyncRecord {

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
  public vendorThingID: string;

  @Column()
  public kiiAppID: string;

  @Column()
  public type: string;

  @Column()
  public fullKiiThingID: string;

  @Column()
  public schemaName: string;

  @Column()
  public schemaVersion: string;

  @Column()
  public kiiThingID: string;

  public connectivity: any;
  public status: ThingState = {};
}
