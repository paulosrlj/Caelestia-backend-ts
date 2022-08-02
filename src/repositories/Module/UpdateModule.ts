import prisma from '../../config/prismaClient';
import { Module } from '../../domain/entities/Module';
import {
  IUpdateModuleRepository,
  UpdateModuleModel,
} from '../interfaces/IUpdateModuleRepository';

class UpdateModule implements IUpdateModuleRepository {
  update(id: string, module: UpdateModuleModel): Promise<Module> {
    return prisma.module.update({ data: module, where: { id } });
  }
}

export default UpdateModule;
