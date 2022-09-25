import {
  PrismaClient,
  Prisma,
  TheoricLesson,
  TheoricLessonsFinished,
} from '@prisma/client';
import { CompleteLessonModel } from '../../domain/usecases/PraticalLesson/complete-lesson';
import { CreateTheoricLessonModel } from '../../domain/usecases/TheoricLesson/create';
import { UpdateTheoricLessonModel } from '../../domain/usecases/TheoricLesson/update';
import BadRequest from '../../exceptions/BadRequest';
import NotFound from '../../exceptions/NotFound';
import { ICompleteTheoricLessonRepository } from './interfaces/ICompleteTheoricLesson';
import { ICreateTheoricLessonRepository } from './interfaces/ICreateTheoricLesson';
import { IDeleteTheoricLessonRepository } from './interfaces/IDeleteTheoricLesson';
import { IGetOneTheoricLessonRepository } from './interfaces/IGetOneTheoricLesson';
import { IUpdateTheoricLessonRepository } from './interfaces/IUpdateTheoricLesson';

class TheoricLessonRepository
  implements
    ICreateTheoricLessonRepository,
    IUpdateTheoricLessonRepository,
    IDeleteTheoricLessonRepository,
    ICompleteTheoricLessonRepository,
    IGetOneTheoricLessonRepository
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
    theoricLesson: CreateTheoricLessonModel,
  ): Promise<TheoricLesson> {
    const module = await this.prismaClient.module.findFirst({
      where: { id: theoricLesson.moduleId },
    });
    if (!module) throw new NotFound('O módulo para esta lição não existe');

    return this.prismaClient.theoricLesson.create({
      data: theoricLesson,
    });
  }

  async getOne(id: string): Promise<TheoricLesson> {
    const theoricLesson = await this.prismaClient.theoricLesson.findFirst({
      where: { id },
    });

    if (!theoricLesson) {
      throw new NotFound(`A lição teórica de id ${id} não existe`);
    }

    return theoricLesson;
  }

  async update(
    id: string,
    theoricLesson: UpdateTheoricLessonModel,
  ): Promise<TheoricLesson> {
    const theoricLessonFound = await this.prismaClient.theoricLesson.findFirst({
      where: { id },
    });

    if (theoricLessonFound === null) {
      throw new NotFound(`A lição teórica de id ${id} não existe`);
    }

    return this.prismaClient.theoricLesson.update({
      data: theoricLesson,
      where: { id },
    });
  }

  async delete(id: string): Promise<void> {
    const theoricLessonFound = await this.prismaClient.theoricLesson.findFirst({
      where: { id },
    });

    if (theoricLessonFound === null) {
      throw new NotFound(`A lição teórica de id ${id} não existe`);
    }

    await this.prismaClient.theoricLesson.delete({ where: { id } });
  }

  async complete({
    lessonId,
    playerId,
  }: CompleteLessonModel): Promise<TheoricLessonsFinished> {
    const alreadyCompelted =
      await this.prismaClient.theoricLessonsFinished.findFirst({
        where: { AND: [{ theoricLessonId: lessonId }, { playerId }] },
      });

    if (alreadyCompelted)
      throw new BadRequest('A lição téorica já está completa');

    const tl = await this.prismaClient.theoricLesson.findFirst({
      where: { id: lessonId },
    });

    if (!tl) throw new NotFound('A lição teórica não existe');

    const player = await this.prismaClient.player.findFirst({
      where: { id: playerId },
    });
    if (!player) throw new NotFound('O jogador não existe');

    // Atualizar as moedas do jogador
    await this.prismaClient.player.update({
      where: { id: player.id },
      data: { coins: player.coins + tl.coinsEarned },
    });

    return this.prismaClient.theoricLessonsFinished.create({
      data: { playerId, theoricLessonId: lessonId },
    });
  }
}

export default TheoricLessonRepository;
