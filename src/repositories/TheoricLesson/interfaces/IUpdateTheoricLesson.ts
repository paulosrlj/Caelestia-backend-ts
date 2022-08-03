import { TheoricLesson } from '@prisma/client';
import { UpdateTheoricLessonModel } from '../../../domain/usecases/TheoricLesson/update';

export interface IUpdateTheoricLesson {
  update(
    id: string,
    theoricLesson: UpdateTheoricLessonModel,
  ): Promise<TheoricLesson>;
}
