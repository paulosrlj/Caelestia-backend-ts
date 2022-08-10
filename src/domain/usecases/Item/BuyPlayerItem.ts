import { PlayerItem } from '@prisma/client';

export interface buyPlayerItemModel {
  itemId: string;
  playerId: string;
  price: number;
}

export interface IBuyPlayerItem {
  buyPlayerItem(buyItemModel: buyPlayerItemModel): Promise<PlayerItem>;
}
