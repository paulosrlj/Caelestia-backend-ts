import { Module } from '../../domain/entities';
import { IFindAllModule } from '../../domain/usecases/Module/findAll';
import { IFindAllModuleRepository } from '../../repositories/interfaces/IFindAllModuleRepository';

class FindAllModuleByIdModuleService implements IFindAllModule {
  private findAllModule: IFindAllModuleRepository;

  constructor(findAllModuleRepository: IFindAllModuleRepository) {
    this.findAllModule = findAllModuleRepository;
  }

  findAll(): Promise<Module[]> {
    return this.findAllModule.findAll();
  }
}

export default FindAllModuleByIdModuleService;
