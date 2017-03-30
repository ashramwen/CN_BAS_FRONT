export interface ESQueryOption {
  endTime: number;
  power: boolean | number;
  startTime: number;
  target: string[];
  group: GroupType;
  pipeline?: GroupType;
}

export enum GroupType {
  None = 0,
  Hour = 1 << 0,
  Day = 1 << 1,
  Target = 1 << 2,
}
