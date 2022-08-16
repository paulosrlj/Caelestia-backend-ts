import { PlayerFriend } from '@prisma/client';

export interface AddFriendModel {
  playerId: string;
  friendId: string;
}

export interface IAddFriend {
  addFriend(addFriendModel: AddFriendModel): Promise<PlayerFriend>;
}
