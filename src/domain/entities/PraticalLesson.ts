export interface PraticalLesson {
  id: string;
  lessonName: string;
  xpEarned: number;
  description: number;
  alternative1: string;
  alternative2: string;
  alternative3: string;
  alternative4: string;
  correctAlternative: number;
  urlAlternative1: string;
  urlAlternative2: string;
  urlAlternative3: string;
  urlAlternative4: string;
  createdAt: Date;
  updatedAt: Date;

  moduleId: string;
}
