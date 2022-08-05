import { IDeletePraticalLesson } from '../../domain/usecases/PraticalLesson/delete';
import { IDeletePraticalLessonRepository } from '../../repositories/PraticalLesson/interfaces/IDeletePraticalLesson';

class DeletePraticalLessonService implements IDeletePraticalLesson {
  private deletePraticalLesson: IDeletePraticalLessonRepository;

  constructor(deletePraticalLesson: IDeletePraticalLessonRepository) {
    this.deletePraticalLesson = deletePraticalLesson;
  }

  async delete(id: string): Promise<void> {
    await this.deletePraticalLesson.delete(id);
  }
}

export default DeletePraticalLessonService;
