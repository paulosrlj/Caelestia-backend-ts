import { IDeactivatePlayer } from '../../domain/usecases/Player/deactivatePlayer';
import { IDeactivatePlayer as IDeactivatePlayerRepository } from '../../repositories/Player/interfaces/IDeactivatePlayer';

class DeactivatePlayerService implements IDeactivatePlayer {
  private deactivateService;

  constructor(deactivateService: IDeactivatePlayerRepository) {
    this.deactivateService = deactivateService;
  }

  async delete(email: string): Promise<void> {
    await this.deactivateService.deactivate(email);
  }
}

export default DeactivatePlayerService;
