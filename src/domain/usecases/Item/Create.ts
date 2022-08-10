import { Item } from '../../entities/Item';

export interface CreateItemModel {
  name: string;
  price: number;
  description: string;
  individualItemId: number;
}

export interface ICreateItem {
  create(item: CreateItemModel): Promise<Item>;
}
