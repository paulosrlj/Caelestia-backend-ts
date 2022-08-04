import { TheoricLesson } from '@prisma/client';
import { CreateTheoricLessonModel } from '../../../domain/usecases/TheoricLesson/create';

export interface ICreateTheoricLessonRepository {
  create(theoricLesson: CreateTheoricLessonModel): Promise<TheoricLesson>;
}
