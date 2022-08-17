import { PlayerRanking, Prisma, PrismaClient, Ranking } from '@prisma/client';
import { AssignRankingModel } from '../../domain/usecases/Ranking/assignRanking';
import { CreateRankingModel } from '../../domain/usecases/Ranking/create-ranking';
import { rankingInfo } from '../../domain/usecases/Ranking/ranking-info';
import AlreadyExists from '../../exceptions/AlreadyExists';
import NotFound from '../../exceptions/NotFound';
import { IAssignRanking } from './interfaces/IAssignRanking';
import { ICreateRanking } from './interfaces/ICreateRanking';

class RankingRepository implements IAssignRanking, ICreateRanking {
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

  async assignRanking({
    playerId,
    rankingIndividualId,
  }: AssignRankingModel): Promise<PlayerRanking> {
    const rankInfo = rankingInfo[rankingIndividualId];

    const player = await this.prismaClient.player.findFirst({
      where: { id: playerId },
    });
    if (!player) throw new NotFound('O jogador não existe');

    const rankingTitle =
      rankInfo.titles[Math.floor(Math.random() * rankInfo.titles.length + 1)];

    const ranking = await this.prismaClient.ranking.findFirst({
      where: { rankingName: rankInfo.name },
    });

    if (!ranking) throw new NotFound('O ranking não existe');

    return this.prismaClient.playerRanking.create({
      data: { rankingTitle, rankingId: ranking.id, playerId },
    });
  }

  async create({
    pointsToPromotion,
    rankingName,
    urlRankingBadge,
  }: CreateRankingModel): Promise<Ranking> {
    const ranking = await this.prismaClient.ranking.findFirst({
      where: { rankingName },
    });

    if (ranking) throw new AlreadyExists('O ranking já existe');

    return this.prismaClient.ranking.create({
      data: { pointsToPromotion, rankingName, urlRankingBadge },
    });
  }
}

export default RankingRepository;
