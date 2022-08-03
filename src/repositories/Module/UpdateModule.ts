import prisma from '../../config/prismaClient';
import { Module } from '../../domain/entities/Module';
import NotFound from '../../exceptions/NotFound';
import {
  IUpdateModuleRepository,
  UpdateModuleModel,
} from '../interfaces/IUpdateModuleRepository';

class UpdateModule implements IUpdateModuleRepository {
  async update(id: string, module: UpdateModuleModel): Promise<Module> {
    const moduleFound = await prisma.module.findFirst({ where: { id } });

    if (moduleFound === null) {
      throw new NotFound(`Módulo de id ${id} não existe`);
    }

    return prisma.module.update({ data: module, where: { id } });
  }
}

export default UpdateModule;
