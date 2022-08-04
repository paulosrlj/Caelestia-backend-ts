import { PraticalLesson } from '../../domain/entities/PraticalLesson';
import {
  IUpdatePraticalLesson,
  UpdatePraticalLessonModel,
} from '../../domain/usecases/PraticalLesson/update';
import { IUpdatePraticalLessonRepository } from '../../repositories/PraticalLesson/interfaces/IUpdatePraticalLesson';

class UpdatePraticalLessonService implements IUpdatePraticalLesson {
  private updatePraticalLesson: IUpdatePraticalLessonRepository;

  constructor(updatePraticalLesson: IUpdatePraticalLessonRepository) {
    this.updatePraticalLesson = updatePraticalLesson;
  }

  update(
    id: string,
    praticalLesson: UpdatePraticalLessonModel,
  ): Promise<PraticalLesson> {
    return this.updatePraticalLesson.update(id, praticalLesson);
  }
}

export default UpdatePraticalLessonService;
