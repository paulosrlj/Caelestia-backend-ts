import { Player } from '@prisma/client';

export interface IFindByIdPlayer {
  findById(id: string): Promise<Player>;
}
