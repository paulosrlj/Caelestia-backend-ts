import { PraticalLesson } from '@prisma/client';
import { UpdatePraticalLessonModel } from '../../../domain/usecases/PraticalLesson/update';

export interface IUpdatePraticalLessonRepository {
  update(
    id: string,
    praticalLesson: UpdatePraticalLessonModel,
  ): Promise<PraticalLesson>;
}
