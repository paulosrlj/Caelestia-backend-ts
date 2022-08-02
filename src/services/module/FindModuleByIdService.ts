import { Module } from '../../domain/entities';
import { IFindModuleById } from '../../domain/usecases/Module/findById';
import NotFound from '../../exceptions/NotFound';

class FindModuleByIdModuleService implements IFindModuleById {
  private findModule: IFindModuleById;

  constructor(findModuleRepository: IFindModuleById) {
    this.findModule = findModuleRepository;
  }

  async findById(id: string): Promise<Module> {
    const module = await this.findModule.findById(id);

    if (module === null) {
      throw new NotFound(`Módulo de id ${id} não existe`);
    }

    return module;
  }
}

export default FindModuleByIdModuleService;
