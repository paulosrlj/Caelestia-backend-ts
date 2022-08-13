export interface PraticalLesson {
  id: string;
  lessonName: string;
  xpEarned: number;
  coinsEarned: number;
  description: string;
  alternative1: string;
  alternative2: string;
  alternative3: string;
  alternative4: string;
  correctAlternative: number;
  urlAlternative1?: string | null;
  urlAlternative2?: string | null;
  urlAlternative3?: string | null;
  urlAlternative4?: string | null;
  createdAt: Date;
  updatedAt: Date;

  moduleId: string;
}
