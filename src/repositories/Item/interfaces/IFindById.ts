import { Item } from '../../../domain/entities/Item';

export interface IFindByIdItem {
  findById(id: string): Promise<Item>;
}
