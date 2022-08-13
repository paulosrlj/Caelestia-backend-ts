import {
  PraticalLesson,
  PraticalLessonsFinished,
  Prisma,
  PrismaClient,
} from '@prisma/client';
import { CompleteLessonModel } from '../../domain/usecases/PraticalLesson/complete-lesson';
import {
  CreatePraticalLessonModel,
  ICreatePraticalLesson,
} from '../../domain/usecases/PraticalLesson/create';
import {
  IUpdatePraticalLesson,
  UpdatePraticalLessonModel,
} from '../../domain/usecases/PraticalLesson/update';
import NotFound from '../../exceptions/NotFound';
import { ICompletePraticalLessonRepository } from './interfaces/ICompletePraticalLesson';
import { IDeletePraticalLessonRepository } from './interfaces/IDeletePraticalLesson';

class PraticalLessonRepository
  implements
    ICreatePraticalLesson,
    IUpdatePraticalLesson,
    IDeletePraticalLessonRepository,
    ICompletePraticalLessonRepository
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

  async create(
    praticalLesson: CreatePraticalLessonModel,
  ): Promise<PraticalLesson> {
    const module = await this.prismaClient.module.findFirst({
      where: { id: praticalLesson.moduleId },
    });
    if (!module) throw new NotFound('O módulo para esta lição não existe');

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

  async complete({
    lessonId,
    playerId,
  }: CompleteLessonModel): Promise<PraticalLessonsFinished> {
    const pl = await this.prismaClient.praticalLesson.findFirst({
      where: { id: lessonId },
    });

    if (!pl) throw new NotFound('A lição prática não existe');

    const player = await this.prismaClient.player.findFirst({
      where: { id: playerId },
    });
    if (!player) throw new NotFound('O jogador não existe');

    // Atualizar as moedas do jogador
    await this.prismaClient.player.update({
      where: { id: player.id },
      data: { coins: player.coins + pl.coinsEarned },
    });

    return this.prismaClient.praticalLessonsFinished.create({
      data: { playerId, praticalLessonId: lessonId },
    });
  }
}

export default PraticalLessonRepository;
