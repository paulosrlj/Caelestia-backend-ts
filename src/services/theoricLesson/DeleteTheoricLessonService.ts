import { IDeleteTheoricLesson } from '../../domain/usecases/TheoricLesson/delete';
import { IDeleteTheoricLessonRepository } from '../../repositories/TheoricLesson/interfaces/IDeleteTheoricLesson';

class DeleteTheoricLesson implements IDeleteTheoricLesson {
  private deleteTheoricLesson: IDeleteTheoricLessonRepository;

  constructor(deleteTheoricLesson: IDeleteTheoricLessonRepository) {
    this.deleteTheoricLesson = deleteTheoricLesson;
  }

  delete(id: string): Promise<void> {
    return this.deleteTheoricLesson.delete(id);
  }
}

export default DeleteTheoricLesson;
