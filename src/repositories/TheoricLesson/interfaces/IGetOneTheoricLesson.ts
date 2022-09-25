import { TheoricLesson } from '@prisma/client';

export interface IGetOneTheoricLessonRepository {
  getOne(id: string): Promise<TheoricLesson>;
}
