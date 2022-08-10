import { Player } from '../../entities/Player';

export interface LevelUpPlayerModel {
  email: string;
  xpEarned: number;
  coinsEarned: number;
}

export interface ILevelUpPlayer {
  levelUpPlayer(levelUpModel: LevelUpPlayerModel): Promise<Player>;
}
