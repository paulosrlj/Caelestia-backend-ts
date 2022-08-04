export interface IDeleteTheoricLessonRepository {
  delete(id: string): Promise<void>;
}
