export interface ForgotPasswordCodeTable {
  id?: number;
  userId: number;
  createdOn: Date;
  code: string;
  token?: string;
  passwordUpdated?: boolean;
  obsolete?: boolean;
}
