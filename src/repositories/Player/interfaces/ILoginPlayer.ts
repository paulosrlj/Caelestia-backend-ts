import { Player } from '../../../domain/entities/Player';

export interface ILoginPlayer {
  loginPlayer(email: string): Promise<Player>;
}
