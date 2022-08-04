import { IDeletePraticalLesson } from '../../domain/usecases/PraticalLesson/delete';
import { IDeletePraticalLessonRepository } from '../../repositories/PraticalLesson/interfaces/IDeletePraticalLesson';

class CreatePraticalLessonService implements IDeletePraticalLesson {
  private deletePraticalLesson: IDeletePraticalLessonRepository;

  constructor(deletePraticalLesson: IDeletePraticalLessonRepository) {
    this.deletePraticalLesson = deletePraticalLesson;
  }

  async delete(id: string): Promise<void> {
    await this.deletePraticalLesson.delete(id);
  }
}

export default CreatePraticalLessonService;
