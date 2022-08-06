import { Player } from '../../entities/Player';

export interface UpdatePlayerModel {
  password?: string;
  name?: string;
  nickname?: string;
  urlProfileImg?: string;
  totalPoints?: string;
  level?: string;
  coints?: string;
}

export interface IUpdatePlayer {
  update(id: string, player: UpdatePlayerModel): Promise<Player>;
}
