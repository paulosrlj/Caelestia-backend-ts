import { PraticalLessonsFinished } from '@prisma/client';
import {
  CompleteLessonModel,
  ICompletePraticalLesson,
} from '../../domain/usecases/PraticalLesson/complete-lesson';
import { ICompletePraticalLessonRepository } from '../../repositories/PraticalLesson/interfaces/ICompletePraticalLesson';

class CompletePraticalLessonService implements ICompletePraticalLesson {
  private completePlRepo;

  constructor(completePlRepo: ICompletePraticalLessonRepository) {
    this.completePlRepo = completePlRepo;
  }

  async completePL(
    completeLessonModel: CompleteLessonModel,
  ): Promise<PraticalLessonsFinished> {
    return this.completePlRepo.complete(completeLessonModel);
  }
}

export default CompletePraticalLessonService;
