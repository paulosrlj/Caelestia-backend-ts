import { Module } from '../../domain/entities';
import { IFindModuleById } from '../../domain/usecases/Module/findById';

import NotFound from '../../exceptions/NotFound';
import { IFindModuleById as IFindModuleByIdRepository } from '../../repositories/Module/interfaces/IFindById';

class FindModuleByIdService implements IFindModuleById {
  private findModule: IFindModuleByIdRepository;

  constructor(findModuleRepository: IFindModuleByIdRepository) {
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

export default FindModuleByIdService;
