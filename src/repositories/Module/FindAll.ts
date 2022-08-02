import prisma from '../../config/prismaClient';
import { Module } from '../../domain/entities';
import { IFindAllModule } from '../../domain/usecases/Module/findAll';

class FindAll implements IFindAllModule {
  findAll(): Promise<Module[]> {
    return prisma.module.findMany();
  }
}

export default FindAll;
