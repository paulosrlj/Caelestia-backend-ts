import { PraticalLesson } from '../../domain/entities/PraticalLesson';
import {
  CreatePraticalLessonModel,
  ICreatePraticalLesson,
} from '../../domain/usecases/PraticalLesson/create';
import { ICreatePraticalLessonRepository } from '../../repositories/PraticalLesson/interfaces/ICreatePraticalLesson';

class CreatePraticalLessonService implements ICreatePraticalLesson {
  private createPraticalLesson: ICreatePraticalLessonRepository;

  constructor(createPraticalLesson: ICreatePraticalLessonRepository) {
    this.createPraticalLesson = createPraticalLesson;
  }

  create(praticalLesson: CreatePraticalLessonModel): Promise<PraticalLesson> {
    return this.createPraticalLesson.create(praticalLesson);
  }
}

export default CreatePraticalLessonService;
