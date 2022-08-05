import { Prisma, PrismaClient } from '@prisma/client';
import { CreateModuleModel } from '../../domain/usecases/Module/create';
import { Module } from '../../domain/entities';

import { ICreateModule } from './interfaces/ICreateModule';
import { IFindModuleById } from './interfaces/IFindById';
import { IFindAllModule } from './interfaces/IFindAllModule';
import { IUpdateModule, UpdateModuleModel } from './interfaces/IUpdateModule';
import { IDeleteModule } from './interfaces/IDeleteModule';
import NotFound from '../../exceptions/NotFound';

class ModuleRepository
  implements
    ICreateModule,
    IFindModuleById,
    IFindAllModule,
    IUpdateModule,
    IDeleteModule
{
  private prismaClient;

  constructor(
    prismaClient: PrismaClient<
      Prisma.PrismaClientOptions,
      never,
      Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined
    >,
  ) {
    this.prismaClient = prismaClient;
  }

  create(module: CreateModuleModel): Promise<Module> {
    return this.prismaClient.module.create({ data: module });
  }

  findById(id: string): Promise<Module | null> {
    return this.prismaClient.module.findFirst({
      where: { id },
      include: {
        theoricLessons: {
          select: {
            id: true,
            lessonName: true,
            content: true,
            xpEarned: true,
            description: true,
          },
        },
        praticalLessons: {
          select: {
            id: true,
            lessonName: true,
            xpEarned: true,
            description: true,
            alternative1: true,
            alternative2: true,
            alternative3: true,
            alternative4: true,
            correctAlternative: true,
            urlAlternative1: true,
            urlAlternative2: true,
            urlAlternative3: true,
            urlAlternative4: true,
          },
        },
      },
    });
  }

  findAll(): Promise<Module[]> {
    return this.prismaClient.module.findMany({
      include: {
        theoricLessons: {
          select: {
            id: true,
            lessonName: true,
            content: true,
            xpEarned: true,
            description: true,
          },
        },
        praticalLessons: {
          select: {
            id: true,
            lessonName: true,
            xpEarned: true,
            description: true,
            alternative1: true,
            alternative2: true,
            alternative3: true,
            alternative4: true,
            correctAlternative: true,
            urlAlternative1: true,
            urlAlternative2: true,
            urlAlternative3: true,
            urlAlternative4: true,
          },
        },
      },
    });
  }

  async update(id: string, module: UpdateModuleModel): Promise<Module> {
    const moduleFound = await this.prismaClient.module.findFirst({
      where: { id },
    });

    if (moduleFound === null) {
      throw new NotFound(`Módulo de id ${id} não existe`);
    }

    return this.prismaClient.module.update({ data: module, where: { id } });
  }

  async delete(id: string): Promise<void> {
    const module = await this.prismaClient.module.findFirst({ where: { id } });

    if (module === null) {
      throw new NotFound(`Módulo de id ${id} não existe`);
    }

    await this.prismaClient.module.delete({ where: { id } });
  }
}

export default ModuleRepository;
