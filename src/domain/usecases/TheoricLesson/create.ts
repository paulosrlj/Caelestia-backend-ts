import { TheoricLesson } from '@prisma/client';

export interface CreateTheoricLessonModel {
  lessonName: string;
  xpEarned: number;
  description: string;
  coinsEarned: number;
  content: string;
  moduleId: string;
}

export interface ICreateTheoricLesson {
  create(theoricLesson: CreateTheoricLessonModel): Promise<TheoricLesson>;
}
