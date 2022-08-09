import { Achievement } from '../../entities/Achievement';

export interface IFindByIdAchievement {
  findById(id: string): Promise<Achievement>;
}
