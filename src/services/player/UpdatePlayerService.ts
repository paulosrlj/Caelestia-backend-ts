import bcrypt from 'bcrypt';

import { Player } from '../../domain/entities/Player';
import {
  IUpdatePlayer,
  UpdatePlayerModel,
} from '../../domain/usecases/Player/update';
import { IUpdatePlayer as IUpdatePlayerRepository } from '../../repositories/Player/interfaces/IUpdatePlayer';

class CreatePlayerService implements IUpdatePlayer {
  private updatePlayer;

  constructor(updatePlayer: IUpdatePlayerRepository) {
    this.updatePlayer = updatePlayer;
  }

  async update(email: string, player: UpdatePlayerModel): Promise<Player> {
    if (player.password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(player.password, salt);
      player.password = hashedPassword;
    }

    return this.updatePlayer.update(email, player);
  }
}

export default CreatePlayerService;
