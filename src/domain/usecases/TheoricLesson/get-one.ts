import { TheoricLesson } from '@prisma/client';

export interface IGetOneTheoricLesson {
  getOne(id: string): Promise<TheoricLesson>;
}
