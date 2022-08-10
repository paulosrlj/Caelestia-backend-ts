import { Item } from '../../../domain/entities/Item';
import { CreateItemModel } from '../../../domain/usecases/Item/Create';

export interface ICreateItem {
  create(item: CreateItemModel): Promise<Item>;
}
