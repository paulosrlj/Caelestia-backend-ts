import { Player } from '../../../domain/entities/Player';

export interface IFindByEmailPlayer {
  findByEmail(email: string): Promise<Player>;
}
