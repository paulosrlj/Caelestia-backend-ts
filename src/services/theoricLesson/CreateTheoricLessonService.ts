import { TheoricLesson } from '@prisma/client';
import {
  CreateTheoricLessonModel,
  ICreateTheoricLesson,
} from '../../domain/usecases/TheoricLesson/create';
import { ICreateTheoricLessonRepository } from '../../repositories/TheoricLesson/interfaces/ICreateTheoricLesson';

class CreateTheoricLessonService implements ICreateTheoricLesson {
  private createTheoricLesson: ICreateTheoricLessonRepository;

  constructor(createTheoricLesson: ICreateTheoricLessonRepository) {
    this.createTheoricLesson = createTheoricLesson;
  }

  async create(
    theoricLesson: CreateTheoricLessonModel,
  ): Promise<TheoricLesson> {
    return this.createTheoricLesson.create(theoricLesson);
  }
}

export default CreateTheoricLessonService;
