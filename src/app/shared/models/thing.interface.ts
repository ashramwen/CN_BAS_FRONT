export interface Thing {
  id: number;
  createDate: number;
  modifyDate: number;
  createBy: string;
  modifyBy: string;
  vendorThingID: string;
  kiiAppID: string;
  type: string;
  status?: Status;
  fullKiiThingID: string;
  schemaName: string;
  schemaVersion: string;
  kiiThingID: string;
  tags?: any[];
  globalThingID: number;
}

export interface Status {
  date: number;
  Bri: number;
  Power: number;
  target: string;
}
