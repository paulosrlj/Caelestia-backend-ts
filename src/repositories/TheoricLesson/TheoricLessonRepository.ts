import { PrismaClient, Prisma, TheoricLesson } from '@prisma/client';
import { CreateTheoricLessonModel } from '../../domain/usecases/TheoricLesson/create';
import { UpdateTheoricLessonModel } from '../../domain/usecases/TheoricLesson/update';
import NotFound from '../../exceptions/NotFound';
import { ICreateTheoricLesson } from './interfaces/ICreateTheoricLesson';
import { IDeleteTheoricLesson } from './interfaces/IDeleteTheoricLesson';
import { IUpdateTheoricLesson } from './interfaces/IUpdateTheoricLesson';

class TheoricLessonRepository
  implements ICreateTheoricLesson, IUpdateTheoricLesson, IDeleteTheoricLesson
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
    return this.prismaClient.theoricLesson.create({ data: theoricLesson });
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
}

export default TheoricLessonRepository;
