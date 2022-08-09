import { Player } from '../../entities/Player';

export interface ILevelUpPlayer {
  levelUpPlayer(email: string): Promise<Player>;
}
