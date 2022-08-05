import { PraticalLesson } from '../../entities/PraticalLesson';

export interface CreatePraticalLessonModel {
  lessonName: string;
  xpEarned: number;
  description: string;
  coinsEarned: number;
  alternative1: string;
  alternative2: string;
  alternative3: string;
  alternative4: string;
  correctAlternative: number;
  urlAlternative1?: string;
  urlAlternative2?: string;
  urlAlternative3?: string;
  urlAlternative4?: string;

  moduleId: string;
}

export interface ICreatePraticalLesson {
  create(praticalLesson: CreatePraticalLessonModel): Promise<PraticalLesson>;
}
