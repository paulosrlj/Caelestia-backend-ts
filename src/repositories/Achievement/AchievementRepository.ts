import { Prisma, PrismaClient } from '@prisma/client';
import { Achievement } from '../../domain/entities/Achievement';
import { CreateAchievementModel } from '../../domain/usecases/Achievement/create';
import { ICreateAchievement } from './interfaces/ICreateAchievement';

class AchievementRepository implements ICreateAchievement {
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

  async create(achievement: CreateAchievementModel): Promise<Achievement> {
    return this.prismaClient.achievement.create({ data: achievement });
  }
}

export default AchievementRepository;
