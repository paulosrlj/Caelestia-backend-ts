import { PlayerItem, Prisma, PrismaClient } from '@prisma/client';
import { Item } from '../../domain/entities/Item';
import { buyPlayerItemModel } from '../../domain/usecases/Item/BuyPlayerItem';
import { CreateItemModel } from '../../domain/usecases/Item/Create';
import BadRequest from '../../exceptions/BadRequest';
import NotFound from '../../exceptions/NotFound';
import { IBuyItem } from './interfaces/IBuyItem';
import { ICreateItem } from './interfaces/ICreateItem';
import { IFindByIdItem } from './interfaces/IFindById';

class ItemRepository implements ICreateItem, IBuyItem, IFindByIdItem {
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

  async findById(id: string): Promise<Item> {
    const item = await this.prismaClient.item.findFirst({ where: { id } });
    if (!item) throw new NotFound('O item não existe');

    return item;
  }

  async create(item: CreateItemModel): Promise<Item> {
    return this.prismaClient.item.create({ data: item });
  }

  async buyItem(buyItemModel: buyPlayerItemModel): Promise<PlayerItem> {
    // verificar se jogador existe
    const player = await this.prismaClient.player.findFirst({
      where: { id: buyItemModel.playerId },
    });

    if (!player) throw new NotFound('O jogador não existe');

    // verificar se é posível comprar o item
    if (buyItemModel.price > player.coins)
      throw new BadRequest('As moedas são insuficientes para comprar o item');

    // verificar se item existe
    const item = await this.prismaClient.item.findFirst({
      where: { id: buyItemModel.itemId },
    });

    if (!item) throw new NotFound('O item não existe');

    const alreadyExists = await this.prismaClient.playerItem.findFirst({
      where: { itemId: buyItemModel.itemId },
    });

    await this.prismaClient.player.update({
      where: { id: player.id },
      data: { coins: player.coins - buyItemModel.price },
    });

    if (alreadyExists) {
      return this.prismaClient.playerItem.update({
        where: {
          playerId_itemId: {
            itemId: buyItemModel.itemId,
            playerId: buyItemModel.playerId,
          },
        },
        data: { amount: alreadyExists.amount + 1 },
      });
    }

    return this.prismaClient.playerItem.create({
      data: {
        itemId: buyItemModel.itemId,
        playerId: buyItemModel.playerId,
        amount: 1,
      },
    });
  }
}

export default ItemRepository;
