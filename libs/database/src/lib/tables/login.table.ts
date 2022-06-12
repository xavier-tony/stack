export interface LoginTable {
  id: number;
  userId: number;
  on: Date;
  tracking?: any;
  device?: any;
  logOut: boolean;
  obsolete?: boolean;
}
