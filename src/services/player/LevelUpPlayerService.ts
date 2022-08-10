import { Player } from '../../domain/entities/Player';
import {
  ILevelUpPlayer,
  LevelUpPlayerModel,
} from '../../domain/usecases/Player/levelUpPlayer';
import { IFindByEmailPlayer } from '../../repositories/Player/interfaces/IFindByEmailPlayer';
import { IUpdatePlayer as IUpdatePlayerRepository } from '../../repositories/Player/interfaces/IUpdatePlayer';

interface dataToUpdate {
  level: number;
  currentXp: number;
  coins: number;
}

interface LevelUpPlayerRepo
  extends IUpdatePlayerRepository,
    IFindByEmailPlayer {}

class LevelUpPlayerService implements ILevelUpPlayer {
  private updatePlayer;

  constructor(updatePlayer: LevelUpPlayerRepo) {
    this.updatePlayer = updatePlayer;
  }

  async levelUpPlayer(levelUpModel: LevelUpPlayerModel): Promise<Player> {
    const player = await this.updatePlayer.findByEmail(levelUpModel.email);

    const data: dataToUpdate = { level: 0, currentXp: 0, coins: 0 };

    // caso suba de nível
    if (player.currentXp! + levelUpModel.xpEarned >= 100) {
      data.level = player.level! + 1;
      data.currentXp = player.currentXp! + levelUpModel.xpEarned - 100;
      data.coins = player.coins! + levelUpModel.coinsEarned;

      const updatedPlayer = await this.updatePlayer.update(
        levelUpModel.email,
        data,
      );

      return updatedPlayer;
    }

    // O nível permanece o mesmo
    data.level = player.level!;
    data.currentXp = player.currentXp! + levelUpModel.xpEarned;
    data.coins = player.coins! + levelUpModel.coinsEarned;
    return this.updatePlayer.update(levelUpModel.email, data);
  }
}

export default LevelUpPlayerService;
