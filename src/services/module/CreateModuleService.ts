import { Module } from '../../domain/entities';
import {
  CreateModuleModel,
  ICreateModule,
} from '../../domain/usecases/Module/create';
import { ICreateModuleRepository } from '../../repositories/interfaces/ICreateModuleRepository';

class CreateModuleService implements ICreateModule {
  private createModule: ICreateModuleRepository;

  constructor(createModuleRepository: ICreateModuleRepository) {
    this.createModule = createModuleRepository;
  }

  create(module: CreateModuleModel): Promise<Module> {
    return this.createModule.create(module);
  }
}

export default CreateModuleService;
