export interface IDeletePraticalLessonRepository {
  delete(id: string): Promise<void>;
}
