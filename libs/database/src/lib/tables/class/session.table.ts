export interface SessionTable {
  id?: number;
  classGroupId?: number;
  classTypeId: number;
  classScheduleId: number;
  teacherId: number;
  minAge: number;
  maxAge: number;
  duration: number;
  minCount: number;
  maxCount: number;
  description: string;
  prerequisites: string;
  eminities: string;
  teacherExperience: string;
}
