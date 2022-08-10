import { PlayerItem } from '@prisma/client';
import {
  buyPlayerItemModel,
  IBuyPlayerItem,
} from '../../domain/usecases/Item/BuyPlayerItem';
import { IBuyItem as IBuyItemRepository } from '../../repositories/Item/interfaces/IBuyItem';

class BuyItemService implements IBuyPlayerItem {
  private buyItem;

  constructor(buyItem: IBuyItemRepository) {
    this.buyItem = buyItem;
  }

  buyPlayerItem(buyItemModel: buyPlayerItemModel): Promise<PlayerItem> {
    return this.buyItem.buyItem(buyItemModel);
  }
}

export default BuyItemService;
