import { Player } from '@prisma/client';
import { CreatePlayerModel } from '../../../domain/usecases/Player/create';

export interface ICreatePlayer {
  create(player: CreatePlayerModel): Promise<Player>;
}
