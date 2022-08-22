import {
  Player as PrismaPlayer,
  PlayerFriend,
  PlayerRanking,
  Prisma,
  PrismaClient,
} from '@prisma/client';
import { Player } from '../../domain/entities/Player';
import { AddFriendModel } from '../../domain/usecases/Player/add-friend';
import { CreatePlayerModel } from '../../domain/usecases/Player/create';
import { UpdatePlayerModel } from '../../domain/usecases/Player/update';
import { AssignRankingModel } from '../../domain/usecases/Ranking/assignRanking';
import { rankingInfo } from '../../domain/usecases/Ranking/ranking-info';

import AlreadyExists from '../../exceptions/AlreadyExists';
import BadRequest from '../../exceptions/BadRequest';
import NotFound from '../../exceptions/NotFound';
import { IAddFriend } from './interfaces/IAddFriend';

import { ICreatePlayer } from './interfaces/ICreatePlayer';
import { IDeactivatePlayer } from './interfaces/IDeactivatePlayer';
import { IFindByEmailPlayer } from './interfaces/IFindByEmailPlayer';
import { IFindByIdPlayer } from './interfaces/IFindByIdPlayer';
import { ILoginPlayer } from './interfaces/ILoginPlayer';
import { IUpdatePlayer } from './interfaces/IUpdatePlayer';

class PlayerRepository
  implements
    ICreatePlayer,
    IFindByEmailPlayer,
    IDeactivatePlayer,
    IUpdatePlayer,
    ILoginPlayer,
    IFindByIdPlayer,
    IAddFriend
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

  async findById(id: string): Promise<Player> {
    const player = await this.prismaClient.player.findFirst({ where: { id } });
    if (!player) throw new NotFound('O jogador não existe');

    return player;
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

    const persistedPlayer = await this.prismaClient.player.create({
      data: player,
    });

    // assign base ranking to newly created player
    // Choose a random ranking title

    await this.assignRanking({
      playerId: persistedPlayer.id,
      rankingIndividualId: 0,
    });

    return persistedPlayer;
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
        currentXp: true,
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
        currentXp: true,
        totalPoints: true,
      },
    });
  }

  async loginPlayer(email: string): Promise<Player> {
    const player = await this.prismaClient.player.findFirst({
      where: { email },
      select: {
        id: true,
        email: true,
        password: true,
      },
    });

    if (player === null) {
      throw new NotFound(`O jogador de email ${email} não existe`);
    }

    return player;
  }

  async addFriend({
    playerId,
    friendId,
  }: AddFriendModel): Promise<PlayerFriend> {
    if (playerId === friendId)
      throw new BadRequest('O jogador não pode ser amigo de si mesmo');

    const player = await this.prismaClient.player.findFirst({
      where: { id: playerId },
    });

    if (player === null) throw new NotFound(`O jogador não existe`);

    const friend = await this.prismaClient.player.findFirst({
      where: { id: friendId },
    });

    if (!friend) throw new NotFound(`O jogador não existe`);

    const alreadyFriend = await this.prismaClient.playerFriend.findFirst({
      where: { AND: [{ selfPlayerId: playerId }, { friendId }] },
    });

    if (alreadyFriend) throw new NotFound(`O jogador já tem esse amigo`);

    return this.prismaClient.playerFriend.create({
      data: { selfPlayerId: playerId, friendId },
    });
  }

  async assignRanking({
    playerId,
    rankingIndividualId,
  }: AssignRankingModel): Promise<PlayerRanking> {
    if (
      rankingIndividualId < 0 ||
      rankingIndividualId > rankingInfo.length - 1
    ) {
      throw new BadRequest('Id de ranking inválido');
    }
    const rankInfo = rankingInfo[rankingIndividualId];

    const player = await this.prismaClient.player.findFirst({
      where: { id: playerId },
    });
    if (!player) throw new NotFound('O jogador não existe');

    // Choose a random ranking title
    const rankingTitle =
      rankInfo.titles[Math.floor(Math.random() * rankInfo.titles.length)];

    const ranking = await this.prismaClient.ranking.findFirst({
      where: { rankingName: rankInfo.name },
    });

    if (!ranking) throw new NotFound('O ranking não existe');

    const alreadyExists = await this.prismaClient.playerRanking.findFirst({
      where: { AND: [{ playerId }, { rankingId: ranking.id }] },
    });

    if (alreadyExists) throw new AlreadyExists('O ranking já existe');

    return this.prismaClient.playerRanking.create({
      data: { rankingTitle, rankingId: ranking.id, playerId },
    });
  }
}

export default PlayerRepository;
