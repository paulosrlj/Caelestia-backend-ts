import { TheoricLesson } from '@prisma/client';

export interface UpdateTheoricLessonModel {
  lessonName?: string;
  xpEarned?: number;
  description?: string;
  content?: string;
  moduleId?: string;
}

export interface IUpdateTheoricLesson {
  update(
    id: string,
    theoricLesson: UpdateTheoricLessonModel,
  ): Promise<TheoricLesson>;
}
