import { Player } from '../../../domain/entities/Player';
import { UpdatePlayerModel } from '../../../domain/usecases/Player/update';

export interface IUpdatePlayer {
  update(email: string, player: UpdatePlayerModel): Promise<Player>;
}
