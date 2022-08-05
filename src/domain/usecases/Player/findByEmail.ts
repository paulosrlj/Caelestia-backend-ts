import { Player } from '../../entities/Player';

export interface IFindByEmailPlayer {
  findByEmail(email: string): Promise<Player>;
}
