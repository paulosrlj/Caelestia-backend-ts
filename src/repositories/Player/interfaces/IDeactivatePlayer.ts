export interface IDeactivatePlayer {
  deactivate(email: string): Promise<void>;
}
