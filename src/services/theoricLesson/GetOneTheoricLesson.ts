import { TheoricLesson } from '@prisma/client';
import { IGetOneTheoricLesson } from '../../domain/usecases/TheoricLesson/get-one';
import { IGetOneTheoricLessonRepository } from '../../repositories/TheoricLesson/interfaces/IGetOneTheoricLesson';

class GetOneTheoricLesson implements IGetOneTheoricLesson {
  private getOneTheoricLesson;

  constructor(getOneTheoricLesson: IGetOneTheoricLessonRepository) {
    this.getOneTheoricLesson = getOneTheoricLesson;
  }

  async getOne(id: string): Promise<TheoricLesson> {
    return this.getOneTheoricLesson.getOne(id);
  }
}

export default GetOneTheoricLesson;
