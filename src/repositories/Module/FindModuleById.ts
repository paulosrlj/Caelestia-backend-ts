import prisma from '../../config/prismaClient';
import { Module } from '../../domain/entities/Module';
import { IFindModuleById } from '../../domain/usecases/Module/findById';

class FindModuleById implements IFindModuleById {
  async findById(id: string): Promise<Module> {
    return prisma.module.findFirstOrThrow({ where: { id } });
  }
}

export default FindModuleById;
