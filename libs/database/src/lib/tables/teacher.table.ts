export interface TeacherTable {
  userId: number;
  firstname: string;
  lastname: string;
  phone?: string;
  dob: Date;
  profileImageUrl?: string;
  introVideoUrl?: string;
  aboutMe: string;
  joinedDate: Date;
  updateOn: Date;
  updatedBy: number;
}
