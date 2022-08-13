import { PraticalLessonsFinished } from '@prisma/client';

export interface CompleteLessonModel {
  lessonId: string;
  playerId: string;
}

export interface ICompletePraticalLesson {
  completePL(
    completeLessonModel: CompleteLessonModel,
  ): Promise<PraticalLessonsFinished>;
}
