import { TheoricLesson } from '@prisma/client';
import { CreateTheoricLessonModel } from '../../../domain/usecases/TheoricLesson/create';

export interface ICreateTheoricLesson {
  create(theoricLesson: CreateTheoricLessonModel): Promise<TheoricLesson>;
}
