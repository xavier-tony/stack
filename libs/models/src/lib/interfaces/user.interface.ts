import { UserTypes } from '../enums/user-types.enum';
export interface User {
  id?: number | undefined;
  userTypeId: UserTypes;
  email: string;
  displayname: string;
  firstname: string;
  lastname: string;
  password?: string | undefined;
  blocked?: boolean;
  frozen?: boolean;
  noRefresh?: boolean;
  forceLogout?: boolean;
}

export interface ITeacher {
  teacherId: number;
}

export interface IStudent {
  studentId: number;
}
