export interface TParent {
  userId: number;
  firstname: string;
  lastname: string;
  phone?: string;
  dob: Date;
  profileImageUrl?: string;
  aboutMe?: string;
  joinedDate: Date;
  updatedOn: Date;
  updatedBy: number;
}
