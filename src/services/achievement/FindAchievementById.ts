import { Achievement } from '../../domain/entities/Achievement';
import { IFindByIdAchievement } from '../../domain/usecases/Achievement/findById';
import { IFindAchievement } from '../../repositories/Achievement/interfaces/IFindAchievement';

class FindAchievementById implements IFindByIdAchievement {
  private findAchievement;

  constructor(findAchievement: IFindAchievement) {
    this.findAchievement = findAchievement;
  }

  async findById(id: string): Promise<Achievement> {
    return this.findAchievement.findById(id);
  }
}

export default FindAchievementById;
