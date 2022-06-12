export interface TStudent {
  userId: number;
  parentId?: number;
  firstname: string;
  lastname: string;
  phone?: string;
  dob: Date;
  profileImageUrl?: string;
  aboutMe?: string;
  useParentPassword?: boolean;
  joinedDate: Date;
  updateOn: Date;
  updatedBy: number;
}
