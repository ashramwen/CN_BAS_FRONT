
export interface LocationTypeResponse {
  id: number;
  createDate: number;
  modifyDate: number;
  createBy: string;
  modifyBy: string;
  isDeleted: boolean;
  level: number;
  description: {
    displayNameCN: string;
    displayNameEN: string;
  }
}
