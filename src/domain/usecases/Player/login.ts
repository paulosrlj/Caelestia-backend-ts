export interface LoginPlayerModel {
  email: string;
  password: string;
}

export interface ILoginPlayer {
  loginPlayer(player: LoginPlayerModel): Promise<string>;
}
