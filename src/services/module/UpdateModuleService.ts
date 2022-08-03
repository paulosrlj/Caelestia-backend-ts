import { Module } from '../../domain/entities';
import {
  IUpdateModule,
  UpdateModuleModel,
} from '../../domain/usecases/Module/update';
import { IUpdateModule as IUpdateModuleRepository } from '../../repositories/Module/interfaces/IUpdateModule';

class UpdateModuleService implements IUpdateModule {
  private updateModule: IUpdateModuleRepository;

  constructor(updateModuleRepository: IUpdateModuleRepository) {
    this.updateModule = updateModuleRepository;
  }

  update(id: string, module: UpdateModuleModel): Promise<Module> {
    return this.updateModule.update(id, module);
  }
}

export default UpdateModuleService;
