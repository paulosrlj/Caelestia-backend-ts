import { TheoricLessonsFinished } from '@prisma/client';

export interface CompleteLessonModel {
  lessonId: string;
  playerId: string;
}

export interface ICompleteTheoricLesson {
  completeTL(
    completeLessonModel: CompleteLessonModel,
  ): Promise<TheoricLessonsFinished>;
}
