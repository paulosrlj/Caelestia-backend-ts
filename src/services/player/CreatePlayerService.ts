import bcrypt from 'bcrypt';
import { Player } from '@prisma/client';
import {
  CreatePlayerModel,
  ICreatePlayer,
} from '../../domain/usecases/Player/create';

import { ICreatePlayer as ICreatePlayerRepository } from '../../repositories/Player/interfaces/ICreatePlayer';

class CreatePlayerService implements ICreatePlayer {
  private createPlayer;

  constructor(createPlayer: ICreatePlayerRepository) {
    this.createPlayer = createPlayer;
  }

  async create(createPlayerModel: CreatePlayerModel): Promise<Player> {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(createPlayerModel.password, salt);
    createPlayerModel.password = hashedPassword;
    return this.createPlayer.create(createPlayerModel);
  }
}

export default CreatePlayerService;
