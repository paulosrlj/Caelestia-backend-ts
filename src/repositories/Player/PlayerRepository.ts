import { Player, Prisma, PrismaClient } from '@prisma/client';
import prisma from '../../config/prismaClient';
import { CreatePlayerModel } from '../../domain/usecases/Player/create';
import AlreadyExists from '../../exceptions/AlreadyExists';
import { ICreatePlayer } from './interfaces/ICreatePlayer';

class PlayerRepository implements ICreatePlayer {
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

  async create(player: CreatePlayerModel): Promise<Player> {
    const playerExists = await this.prismaClient.player.findFirst({
      where: { email: player.email, OR: { nickname: player.nickname } },
    });

    if (playerExists !== null) {
      throw new AlreadyExists(
        `O jogador de email ${playerExists.email} ou apelido ${player.nickname} já existe`,
      );
    }

    return prisma.player.create({ data: player });
  }
}

export default PlayerRepository;
