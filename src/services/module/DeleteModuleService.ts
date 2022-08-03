import { IDeleteModuleById } from '../../domain/usecases/Module/delete';
import { IDeleteModuleRepository } from '../../repositories/interfaces/IDeleteModuleRepository';

class DeleteModuleService implements IDeleteModuleById {
  private deleteModule: IDeleteModuleRepository;

  constructor(deleteModuleRepository: IDeleteModuleRepository) {
    this.deleteModule = deleteModuleRepository;
  }

  async delete(id: string): Promise<void> {
    await this.deleteModule.delete(id);
  }
}

export default DeleteModuleService;
