import { Teacher } from '../../domain/entities/Teacher';
import {
  createClassroomModel,
  ICreateClassroom,
} from '../../domain/usecases/Teacher/create-classroom';
import { ICreateClassroom as ICreateClassroomRepository } from '../../repositories/Teacher/interfaces/ICreateClassroom';
import { randomClassCode } from '../../util/GenerateClassroomCode';

class CreateClassroomService implements ICreateClassroom {
  private createClassroomRepo;

  constructor(createClassroom: ICreateClassroomRepository) {
    this.createClassroomRepo = createClassroom;
  }

  async createClassroom(
    classroomModel: createClassroomModel,
  ): Promise<Teacher> {
    const classCode = randomClassCode();

    const repoClassModel = { ...classroomModel, codClass: classCode };

    return this.createClassroomRepo.createClassroom(repoClassModel);
  }
}

export default CreateClassroomService;
