import { PraticalLesson } from '../../entities/PraticalLesson';

export interface UpdatePraticalLessonModel {
  lessonName?: string;
  xpEarned?: number;
  description?: string;
  alternative1?: string;
  alternative2?: string;
  alternative3?: string;
  alternative4?: string;
  correctAlternative?: number;
  urlAlternative1?: string | null;
  urlAlternative2?: string | null;
  urlAlternative3?: string | null;
  urlAlternative4?: string | null;

  moduleId?: string;
}

export interface IUpdatePraticalLesson {
  update(
    id: string,
    praticalLesson: UpdatePraticalLessonModel,
  ): Promise<PraticalLesson>;
}
