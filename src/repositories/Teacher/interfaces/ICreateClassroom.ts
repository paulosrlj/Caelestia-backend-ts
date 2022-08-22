import { Classroom } from '../../../domain/entities/Classroom';
import { createClassroomModel } from '../../../domain/usecases/Teacher/create-classroom';

export interface createClassroomRepoModel extends createClassroomModel {
  codClass: string;
}

export interface ICreateClassroom {
  createClassroom(classroomModel: createClassroomRepoModel): Promise<Classroom>;
}
