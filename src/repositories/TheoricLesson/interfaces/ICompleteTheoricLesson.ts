import { TheoricLessonsFinished } from '@prisma/client';
import { CompleteLessonModel } from '../../../domain/usecases/PraticalLesson/complete-lesson';

export interface ICompleteTheoricLessonRepository {
  complete(
    completeTLModel: CompleteLessonModel,
  ): Promise<TheoricLessonsFinished>;
}
