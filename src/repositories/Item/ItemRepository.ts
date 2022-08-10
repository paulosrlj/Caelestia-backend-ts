import { Prisma, PrismaClient } from '@prisma/client';
import { Item } from '../../domain/entities/Item';
import { CreateItemModel } from '../../domain/usecases/Item/Create';
import { ICreateItem } from './interfaces/ICreateItem';

class ItemRepository implements ICreateItem {
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

  async create(item: CreateItemModel): Promise<Item> {
    return this.prismaClient.item.create({ data: item });
  }
}

export default ItemRepository;
