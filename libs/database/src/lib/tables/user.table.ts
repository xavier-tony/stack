export interface UserTable {
  id: number;
  userTypeId: number;
  firstname: string;
  lastname: string;
  email: string;
  passwordDigest: string;
  blocked?: boolean;
  frozen?: boolean;
  noRefresh?: boolean;
  forceLogout?: boolean;
  createdOn?: Date;
  updatedOn?: Date;
}
