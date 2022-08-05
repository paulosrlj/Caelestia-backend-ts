import { PraticalLesson, Prisma, PrismaClient } from '@prisma/client';
import {
  CreatePraticalLessonModel,
  ICreatePraticalLesson,
} from '../../domain/usecases/PraticalLesson/create';
import {
  IUpdatePraticalLesson,
  UpdatePraticalLessonModel,
} from '../../domain/usecases/PraticalLesson/update';
import NotFound from '../../exceptions/NotFound';
import { IDeletePraticalLessonRepository } from './interfaces/IDeletePraticalLesson';

class PraticalLessonRepository
  implements
    ICreatePraticalLesson,
    IUpdatePraticalLesson,
    IDeletePraticalLessonRepository
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

  create(praticalLesson: CreatePraticalLessonModel): Promise<PraticalLesson> {
    return this.prismaClient.praticalLesson.create({
      data: praticalLesson,
    });
  }

  async update(
    id: string,
    praticalLesson: UpdatePraticalLessonModel,
  ): Promise<PraticalLesson> {
    const praticalLessonFound = await this.prismaClient.praticalLesson.update({
      data: praticalLesson,
      where: { id },
    });
    if (praticalLessonFound === null) {
      throw new NotFound(`A lição prática de id ${id} não existe`);
    }

    return this.prismaClient.praticalLesson.update({
      data: praticalLesson,
      where: { id },
    });
  }

  async delete(id: string): Promise<void> {
    const praticalLessonFound =
      await this.prismaClient.praticalLesson.findFirst({
        where: { id },
      });

    if (praticalLessonFound === null) {
      throw new NotFound(`A lição prática de id ${id} não existe`);
    }

    await this.prismaClient.praticalLesson.delete({ where: { id } });
  }
}

export default PraticalLessonRepository;
