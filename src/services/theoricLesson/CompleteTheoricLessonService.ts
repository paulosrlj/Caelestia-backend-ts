import { TheoricLessonsFinished } from '@prisma/client';
import { CompleteLessonModel } from '../../domain/usecases/PraticalLesson/complete-lesson';
import { ICompleteTheoricLesson } from '../../domain/usecases/TheoricLesson/complete-lesson';
import { ICompleteTheoricLessonRepository } from '../../repositories/TheoricLesson/interfaces/ICompleteTheoricLesson';

class CompleteTheoricLessonService implements ICompleteTheoricLesson {
  private completeTlRepo;

  constructor(completeTlRepo: ICompleteTheoricLessonRepository) {
    this.completeTlRepo = completeTlRepo;
  }

  async completeTL(
    completeLessonModel: CompleteLessonModel,
  ): Promise<TheoricLessonsFinished> {
    return this.completeTlRepo.complete(completeLessonModel);
  }
}

export default CompleteTheoricLessonService;
