import prisma from '../../config/prismaClient';
import { Module } from '../../domain/entities/Module';
import { IFindModuleByIdRepository } from '../interfaces/IFindByIdRepository';

class FindModuleById implements IFindModuleByIdRepository {
  async findById(id: string): Promise<Module | null> {
    return prisma.module.findFirst({ where: { id } });
  }
}

export default FindModuleById;
