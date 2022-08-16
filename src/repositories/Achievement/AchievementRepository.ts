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

  async createPlayerAchievement({
    moduleId,
    playerId,
  }: playerAchievementModelRepository): Promise<PlayerAchievements> {
    // verificar se o jogador existe
    const player = await this.prismaClient.player.findFirst({
      where: { id: playerId },
    });

    if (!player) throw new NotFound('Este usuário não existe');

    // verificar se o módulo existe
    const module = await this.prismaClient.module.findFirst({
      where: { id: moduleId },
      include: {
        praticalLessons: { select: { id: true } },
        theoricLessons: { select: { id: true } },
      },
    });

    if (!module) throw new NotFound('Este módulo não existe');

    // buscar a conquista deste módulo
    const ac = await this.prismaClient.achievement.findFirst({
      where: { moduleId },
    });

    if (!ac) throw new NotFound('Este conquista não existe');

    // verificar se essa conqusita já não foi desbloqueada
    const playerAc = await this.prismaClient.playerAchievements.findFirst({
      where: {
        AND: [{ achievementId: ac.id }, { playerId }],
      },
    });

    if (playerAc)
      throw new AlreadyExists('Este usuário já desbloqueou esta conquista');

    // verificar se todas as lições do módulo foram concluídas, em ordem para desbloquear a conquista
    const theoricLessonsCompleted =
      await this.prismaClient.theoricLessonsFinished.findMany({
        where: { playerId },
        include: { theoricLesson: { select: { moduleId: true } } },
      });

    const praticalLessonsCompleted =
      await this.prismaClient.praticalLessonsFinished.findMany({
        where: { playerId },
        include: { praticalLesson: { select: { moduleId: true } } },
      });

    // filtrar apenas as lições desse módulo
    const theoricLessonFilter = theoricLessonsCompleted.map(
      t => t.theoricLesson.moduleId === moduleId,
    );

    const praticalLessonFilter = praticalLessonsCompleted.map(
      t => t.praticalLesson.moduleId === moduleId,
    );

    const allLessonsCompleted = [
      ...theoricLessonFilter,
      ...praticalLessonFilter,
    ];

    const lessonsCompleted = allLessonsCompleted.length;
    const totalLessons =
      module.praticalLessons.length + module.theoricLessons.length;

    if (!(lessonsCompleted === totalLessons)) {
      throw new BadRequest('Ainda faltam lições para completar');
    }

    // desbloquear
    return this.prismaClient.playerAchievements.create({
      data: { playerId, achievementId: ac.id },
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
