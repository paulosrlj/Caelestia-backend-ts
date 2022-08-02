import prisma from '../../config/prismaClient';
import { Module } from '../../domain/entities';
import { IFindAllModuleRepository } from '../interfaces/IFindAllModuleRepository';

class FindAll implements IFindAllModuleRepository {
  findAll(): Promise<Module[]> {
    return prisma.module.findMany();
  }
}

export default FindAll;
