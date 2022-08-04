export interface IDeleteTheoricLesson {
  delete(id: string): Promise<void>;
}
