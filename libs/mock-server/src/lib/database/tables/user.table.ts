export interface TUser {
  id?: number;
  email: string;
  userTypeId: number;
  displayname?: string;
  blocked: boolean;
  frozen: boolean;
  updateOn: Date;
  updatedBy: number;
}
