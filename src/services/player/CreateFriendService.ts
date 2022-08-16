import { PlayerFriend } from '@prisma/client';

import {
  AddFriendModel,
  IAddFriend,
} from '../../domain/usecases/Player/add-friend';
import { IAddFriend as IAddFriendRepository } from '../../repositories/Player/interfaces/IAddFriend';

class CreateFriendService implements IAddFriend {
  private addFriendRepo;

  constructor(addFriendRepo: IAddFriendRepository) {
    this.addFriendRepo = addFriendRepo;
  }

  async addFriend(addFriendModel: AddFriendModel): Promise<PlayerFriend> {
    return this.addFriendRepo.addFriend(addFriendModel);
  }
}

export default CreateFriendService;
