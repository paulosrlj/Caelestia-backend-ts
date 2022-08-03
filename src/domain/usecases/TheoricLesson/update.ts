import { TheoricLesson } from '../../entities/TheoricLesson';

export interface UpdateTheoricLessonModel {
  lessonName?: string;
  xpEarned?: number;
  description?: string;
  content?: string;
  moduleId: string;
}

export interface IUpdateModule {
  update(id: string, module: UpdateTheoricLessonModel): Promise<TheoricLesson>;
}
