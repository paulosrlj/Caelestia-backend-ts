import { PlayerAchievements, Prisma, PrismaClient } from '@prisma/client';
import { Achievement } from '../../domain/entities/Achievement';
import { CreateAchievementModel } from '../../domain/usecases/Achievement/create';
import AlreadyExists from '../../exceptions/AlreadyExists';
import NotFound from '../../exceptions/NotFound';
import { ICreateAchievement } from './interfaces/ICreateAchievement';
import {
  ICreatePlayerAchievement,
  playerAchievementModelRepository,
} from './interfaces/ICreatePlayerAchievement';
import { IFindAchievement } from './interfaces/IFindAchievement';

class AchievementRepository
  implements ICreateAchievement, ICreatePlayerAchievement, IFindAchievement
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

  async create(achievement: CreateAchievementModel): Promise<Achievement> {
    const achievementFound = await this.prismaClient.achievement.findFirst({
      where: { moduleId: achievement.moduleId },
    });
    if (achievementFound)
      throw new AlreadyExists(
        `A conquista de id ${achievementFound.id} já existe`,
      );
    return this.prismaClient.achievement.create({ data: achievement });
  }

  async createPlayerAchievement(
    playerAchievement: playerAchievementModelRepository,
  ): Promise<PlayerAchievements> {
    const playerAchievementFound =
      await this.prismaClient.playerAchievements.findFirst({
        where: {
          AND: [
            { achievementId: playerAchievement.achievementId },
            { playerId: playerAchievement.playerId },
          ],
        },
      });

    if (playerAchievementFound)
      throw new AlreadyExists('Este usuário já desbloqueou esta conquista');

    return this.prismaClient.playerAchievements.create({
      data: playerAchievement,
    });
  }

  async findById(achievementId: string): Promise<Achievement> {
    const achievement = await this.prismaClient.achievement.findFirst({
      where: { id: achievementId },
    });

    if (!achievement)
      throw new NotFound(`Conquista de id ${achievementId} não encontrado`);

    return achievement;
  }
}

export default AchievementRepository;
