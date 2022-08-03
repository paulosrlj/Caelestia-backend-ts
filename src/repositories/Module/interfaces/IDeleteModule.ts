export interface IDeleteModule {
  delete(id: string): Promise<void>;
}
