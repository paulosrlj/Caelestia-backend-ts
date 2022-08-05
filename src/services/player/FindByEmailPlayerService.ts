import { Player } from '../../domain/entities/Player';
import { IFindByEmailPlayer } from '../../domain/usecases/Player/findByEmail';
import { IFindByEmailPlayer as IFindByEmailPlayerRepository } from '../../repositories/Player/interfaces/IFindByEmailPlayer';

class FindByEmailPlayerService implements IFindByEmailPlayer {
  private findByEmailPlayer;

  constructor(findByEmailPlayer: IFindByEmailPlayerRepository) {
    this.findByEmailPlayer = findByEmailPlayer;
  }

  async findByEmail(email: string): Promise<Player> {
    return this.findByEmailPlayer.findByEmail(email);
  }
}

export default FindByEmailPlayerService;
