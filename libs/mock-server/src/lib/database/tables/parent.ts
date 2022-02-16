export interface TParent {
  userId: number;
  firstname: string;
  lastname: string;
  displayname?: string;
  phone?: string;
  email: string;
  dob: Date;
  profileImageUrl?: string;
  aboutMe?: string;
  joinedDate: Date;
  updatedOn: Date;
  updatedBy: number;
}
