export interface IRegisterRequest {
  firstname: string;
  lastname: string;
  username: string;
  userTypeId: number;
  blocked?: boolean;
  frozen?: boolean;
  parentId?: number;
  displayname?: string;
  phone?: string;
  email: string;
  dob: Date;
  profileImageUrl?: string;
  introVideoUrl?: string;
  aboutMe?: string;
  useParentPassword?: boolean;
  updatedBy?: number;
}
