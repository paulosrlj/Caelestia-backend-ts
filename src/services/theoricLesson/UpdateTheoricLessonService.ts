import { TheoricLesson } from '@prisma/client';
import {
  IUpdateTheoricLesson,
  UpdateTheoricLessonModel,
} from '../../domain/usecases/TheoricLesson/update';
import { IUpdateTheoricLessonRepository } from '../../repositories/TheoricLesson/interfaces/IUpdateTheoricLesson';

class UpdateTheoricLesson implements IUpdateTheoricLesson {
  private updateTheoricLesson: IUpdateTheoricLessonRepository;

  constructor(updateTheoricLesson: IUpdateTheoricLessonRepository) {
    this.updateTheoricLesson = updateTheoricLesson;
  }

  update(
    id: string,
    theoricLesson: UpdateTheoricLessonModel,
  ): Promise<TheoricLesson> {
    return this.updateTheoricLesson.update(id, theoricLesson);
  }
}

export default UpdateTheoricLesson;
