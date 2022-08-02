export interface IDeleteModuleRepository {
  delete(id: string): Promise<void>;
}
