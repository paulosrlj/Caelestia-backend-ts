import { PraticalLessonsFinished } from '@prisma/client';
import { CompleteLessonModel } from '../../../domain/usecases/PraticalLesson/complete-lesson';

export interface ICompletePraticalLessonRepository {
  complete(
    completePLModel: CompleteLessonModel,
  ): Promise<PraticalLessonsFinished>;
}
