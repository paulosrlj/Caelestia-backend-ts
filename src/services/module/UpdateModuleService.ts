import { Module } from '../../domain/entities';
import {
  IUpdateModule,
  UpdateModuleModel,
} from '../../domain/usecases/Module/update';
import { IUpdateModuleRepository } from '../../repositories/interfaces/IUpdateModuleRepository';

class CreateModuleService implements IUpdateModule {
  private updateModule: IUpdateModuleRepository;

  constructor(updateModuleRepository: IUpdateModuleRepository) {
    this.updateModule = updateModuleRepository;
  }

  update(id: string, module: UpdateModuleModel): Promise<Module> {
    return this.updateModule.update(id, module);
  }
}

export default CreateModuleService;
