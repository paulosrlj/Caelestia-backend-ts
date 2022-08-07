import { Player } from '../../../domain/entities/Player';
import { LoginPlayerModel } from '../../../domain/usecases/Player/login';

export interface IFindByEmailAndPassword {
  findByEmailAndPassword(player: LoginPlayerModel): Promise<Player>;
}
