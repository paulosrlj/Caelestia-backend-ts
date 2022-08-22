import { Classroom } from '../../entities/Classroom';

export interface createClassroomModel {
  teacherId: string;
  name: string;
}

export interface ICreateClassroom {
  createClassroom(classroomModel: createClassroomModel): Promise<Classroom>;
}
