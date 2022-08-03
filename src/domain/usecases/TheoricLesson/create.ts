import { TheoricLesson } from '../../entities/TheoricLesson';

export interface CreateTheoricLessonModel {
  lessonName: string;
  xpEarned: number;
  description: string;
  content: string;
  moduleId: string;
}

export interface ICreateTheoricLesson {
  create(theoricLesson: CreateTheoricLessonModel): Promise<TheoricLesson>;
}
