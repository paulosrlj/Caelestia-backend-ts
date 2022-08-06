export interface IDeactivatePlayer {
  delete(email: string): Promise<void>;
}
