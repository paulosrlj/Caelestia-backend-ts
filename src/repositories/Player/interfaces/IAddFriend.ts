import { PlayerFriend } from '@prisma/client';
import { AddFriendModel } from '../../../domain/usecases/Player/add-friend';

export interface IAddFriend {
  addFriend(addFriendModel: AddFriendModel): Promise<PlayerFriend>;
}
