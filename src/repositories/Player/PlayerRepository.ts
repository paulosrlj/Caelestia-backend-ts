import { Player as PrismaPlayer, Prisma, PrismaClient } from '@prisma/client';
import { Player } from '../../domain/entities/Player';
import { CreatePlayerModel } from '../../domain/usecases/Player/create';
import { LoginPlayerModel } from '../../domain/usecases/Player/login';
import { UpdatePlayerModel } from '../../domain/usecases/Player/update';

import AlreadyExists from '../../exceptions/AlreadyExists';
import NotFound from '../../exceptions/NotFound';

import { ICreatePlayer } from './interfaces/ICreatePlayer';
import { IDeactivatePlayer } from './interfaces/IDeactivatePlayer';
import { IFindByEmailPlayer } from './interfaces/IFindByEmailPlayer';
import { IFindByEmailAndPassword } from './interfaces/IFindByEmailAndPassword';
import { IUpdatePlayer } from './interfaces/IUpdatePlayer';

class PlayerRepository
  implements
    ICreatePlayer,
    IFindByEmailPlayer,
    IDeactivatePlayer,
    IUpdatePlayer,
    IFindByEmailAndPassword
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

  async create(player: CreatePlayerModel): Promise<PrismaPlayer> {
    const playerExists = await this.prismaClient.player.findFirst({
      where: { OR: [{ email: player.email }, { nickname: player.nickname }] },
    });

    if (playerExists !== null) {
      throw new AlreadyExists(
        `O jogador de email ${playerExists.email} ou apelido ${player.nickname} já existe`,
      );
    }

    return this.prismaClient.player.create({ data: player });
  }

  async findByEmail(email: string): Promise<Player> {
    const player = await this.prismaClient.player.findFirst({
      where: { email },
      select: {
        _count: {
          select: { theoricLessons: true, praticalLessons: true, friend: true },
        },
        id: true,
        email: true,
        nickname: true,
        name: true,
        coins: true,
        totalPoints: true,
        level: true,
        urlProfileImg: true,
        rankings: {
          select: {
            ranking: {
              select: {
                id: true,
                rankingName: true,
                urlRankingBadge: true,
                pointsToPromotion: true,
              },
            },
            rankingTitle: true,
          },
        },
      },
    });

    if (player === null) {
      throw new NotFound(`O jogador de email ${email} não existe`);
    }

    return player;
  }

  async deactivate(email: string): Promise<void> {
    const player = await this.prismaClient.player.findFirst({
      where: { email },
    });

    if (!player) {
      throw new NotFound(`O jogador de email ${email} não existe`);
    }

    await this.prismaClient.player.update({
      where: { email },
      data: { isProfileActive: false },
    });
  }

  async update(email: string, player: UpdatePlayerModel): Promise<Player> {
    const playerFound = await this.prismaClient.player.findFirst({
      where: { email },
    });

    if (!playerFound) {
      throw new NotFound(`O jogador de email ${email} não existe`);
    }

    return this.prismaClient.player.update({
      where: { email },
      data: player,
      select: {
        id: true,
        name: true,
        nickname: true,
        level: true,
        coins: true,
        totalPoints: true,
      },
    });
  }

  async findByEmailAndPassword({
    email,
    password,
  }: LoginPlayerModel): Promise<Player> {
    const player = await this.prismaClient.player.findFirst({
      where: {
        AND: [
          {
            email,
          },
          { password },
        ],
      },
    });

    if (!player) {
      throw new NotFound(`Email ou senha incorretos`);
    }

    return player;
  }
}

export default PlayerRepository;
