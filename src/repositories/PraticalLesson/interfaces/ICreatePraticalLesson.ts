import { PraticalLesson } from '../../../domain/entities/PraticalLesson';
import { CreatePraticalLessonModel } from '../../../domain/usecases/PraticalLesson/create';

export interface ICreatePraticalLessonRepository {
  create(praticalLessson: CreatePraticalLessonModel): Promise<PraticalLesson>;
}
