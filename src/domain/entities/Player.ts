export interface Player {
  id?: string;
  email?: string;
  password?: string;
  name?: string;
  nickname?: string;
  totalPoints?: number;
  level?: number;
  coins?: number;
  urlProfileImg?: string | null;
  createdAt?: Date;
  updatedAt?: Date;
}
