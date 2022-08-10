import { Player } from '../../../domain/entities/Player';

export interface IFindByIdPlayer {
  findById(id: string): Promise<Player>;
}
