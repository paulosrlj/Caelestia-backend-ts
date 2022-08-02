/* eslint-disable import/prefer-default-export */
import prisma from '../../config/prismaClient';
import { Module } from '../../domain/entities/Module';
import {
  ICreateModule,
  CreateModuleModel,
} from '../../domain/usecases/Module/create';

class CreateModule implements ICreateModule {
  async create(module: CreateModuleModel): Promise<Module> {
    return prisma.module.create({ data: module });
  }
}

export default CreateModule;
