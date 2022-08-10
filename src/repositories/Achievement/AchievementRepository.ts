import { PlayerAchievements, Prisma, PrismaClient } from '@prisma/client';
import { Achievement } from '../../domain/entities/Achievement';
import { CreateAchievementModel } from '../../domain/usecases/Achievement/create';
import { equipAchievementModel } from '../../domain/usecases/Achievement/equipAchievement';
import { levelUpAchievementModel } from '../../domain/usecases/Achievement/levelUpPlayerAchievement';
import AlreadyExists from '../../exceptions/AlreadyExists';
import BadRequest from '../../exceptions/BadRequest';
import NotFound from '../../exceptions/NotFound';
import { ICreateAchievement } from './interfaces/ICreateAchievement';
import {
  ICreatePlayerAchievement,
  playerAchievementModelRepository,
} from './interfaces/ICreatePlayerAchievement';
import { IEquipPlayerAchievement } from './interfaces/IEquipAchievement';
import { IFindAchievement } from './interfaces/IFindAchievement';
import { ILevelUpAchievement } from './interfaces/ILevelUpAchievement';

class AchievementRepository
  implements
    ICreateAchievement,
    ICreatePlayerAchievement,
    IFindAchievement,
    IEquipPlayerAchievement,
    ILevelUpAchievement
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

  async equipPlayerAchievement({
    achievementId,
    playerId,
  }: equipAchievementModel): Promise<PlayerAchievements> {
    await this.findById(achievementId);
    const player = await this.prismaClient.player.findFirst({
      where: { id: playerId },
    });

    if (!player) throw new NotFound('O jogador não existe');

    // Verificar se existe existe a conquista associada com o jogador
    const playerAc = await this.prismaClient.playerAchievements.findFirst({
      where: { achievementId, playerId },
    });

    if (!playerAc)
      throw new NotFound('Não exise uma conquista associada com esse jogador');

    // buscar e desequipar uma conquista já equipada
    const alreadyEquiped = await this.prismaClient.playerAchievements.findFirst(
      {
        where: { isEquiped: true },
      },
    );

    if (alreadyEquiped) {
      await this.prismaClient.playerAchievements.update({
        where: {
          playerId_achievementId: {
            achievementId: alreadyEquiped.achievementId,
            playerId: alreadyEquiped.playerId,
          },
        },
        data: { isEquiped: false },
      });
    }

    return this.prismaClient.playerAchievements.update({
      where: { playerId_achievementId: { achievementId, playerId } },
      data: { isEquiped: true },
    });
  }

  async levelUpAchievement({
    achievementId,
    playerId,
  }: levelUpAchievementModel): Promise<PlayerAchievements> {
    const ac = await this.findById(achievementId);
    const player = await this.prismaClient.player.findFirst({
      where: { id: playerId },
    });
    if (!player) throw new NotFound('O jogador não existe');

    // Verificar se existe existe a conquista associada com o jogador
    const playerAc = await this.prismaClient.playerAchievements.findFirst({
      where: { achievementId, playerId },
    });
    if (!playerAc)
      throw new NotFound('Não exise uma conquista associada com esse jogador');

    if (playerAc.currentLevelUpPrice! > player.coins)
      throw new BadRequest(
        'As moedas são insuficientes para melhorar a conquista',
      );

    await this.prismaClient.player.update({
      where: { id: playerId },
      data: { coins: player.coins - playerAc.currentLevelUpPrice },
    });

    return this.prismaClient.playerAchievements.update({
      where: { playerId_achievementId: { achievementId, playerId } },
      data: {
        achievementLevel: playerAc.achievementLevel + 1,
        currentLevelUpPrice:
          playerAc.currentLevelUpPrice + ac.levelUpPrice! * 0.1,
      },
    });
  }
}

export default AchievementRepository;
