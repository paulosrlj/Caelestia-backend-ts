import { PlayerItem } from '@prisma/client';
import { buyPlayerItemModel } from '../../../domain/usecases/Item/BuyPlayerItem';

export interface IBuyItem {
  buyItem(buyItemModel: buyPlayerItemModel): Promise<PlayerItem>;
}
