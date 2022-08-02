export interface IDeleteModuleById {
  delete(id: string): Promise<void>;
}
