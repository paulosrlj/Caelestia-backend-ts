import { Player } from '@prisma/client';

export interface CreatePlayerModel {
  email: string;
  password: string;
  name: string;
  nickname: string;
}

export interface ICreatePlayer {
  create(createPlayerModel: CreatePlayerModel): Promise<Player>;
}
