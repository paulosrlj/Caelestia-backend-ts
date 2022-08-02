import prisma from '../../config/prismaClient';
import { Module } from '../../domain/entities/Module';
import { CreateModuleModel } from '../../domain/usecases/Module/create';
import { ICreateModuleRepository } from '../interfaces/ICreateModuleRepository';

class CreateModule implements ICreateModuleRepository {
  async create(module: CreateModuleModel): Promise<Module> {
    return prisma.module.create({ data: module });
  }
}

export default CreateModule;
