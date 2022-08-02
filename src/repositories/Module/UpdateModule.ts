import prisma from '../../config/prismaClient';
import { Module } from '../../domain/entities/Module';
import {
  IUpdateModule,
  UpdateModuleModel,
} from '../../domain/usecases/Module/update';

class UpdateModule implements IUpdateModule {
  update(id: string, module: UpdateModuleModel): Promise<Module> {
    return prisma.module.update({ data: module, where: { id } });
  }
}

export default UpdateModule;
