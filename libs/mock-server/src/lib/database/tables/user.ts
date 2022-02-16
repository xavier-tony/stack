export interface TUser {
  id?: number;
  username: string;
  userTypeId: number;
  blocked: boolean;
  frozen: boolean;
  updateOn: Date;
  updatedBy: number;
}
