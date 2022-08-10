import { Item } from '../../domain/entities/Item';
import {
  CreateItemModel,
  ICreateItem,
} from '../../domain/usecases/Item/Create';
import { ICreateItem as ICreateItemRepository } from '../../repositories/Item/interfaces/ICreateItem';

class CreateItemService implements ICreateItem {
  private createItemRepository;

  constructor(createItemRepository: ICreateItemRepository) {
    this.createItemRepository = createItemRepository;
  }

  async create(item: CreateItemModel): Promise<Item> {
    return this.createItemRepository.create(item);
  }
}

export default CreateItemService;
