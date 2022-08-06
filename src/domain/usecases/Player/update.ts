import { Player } from '../../entities/Player';

export interface UpdatePlayerModel {
  password?: string;
  name?: string;
  nickname?: string;
  urlProfileImg?: string;
  totalPoints?: number;
  level?: number;
  coins?: number;
}

export interface IUpdatePlayer {
  update(email: string, player: UpdatePlayerModel): Promise<Player>;
}
