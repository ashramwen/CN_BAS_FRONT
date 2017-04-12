import { ThingState } from './thing-state.interface';
export interface Thing {
  id: number;
  createDate: number;
  modifyDate: number;
  createBy: string;
  modifyBy: string;
  vendorThingID: string;
  kiiAppID: string;
  type: string;
  status?: ThingState;
  fullKiiThingID: string;
  schemaName: string;
  schemaVersion: string;
  kiiThingID: string;
  tags?: any[];
  globalThingID: number;
  connectivity?: any;
}
