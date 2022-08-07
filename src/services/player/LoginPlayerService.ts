import jwt from 'jsonwebtoken';

import {
  ILoginPlayer,
  LoginPlayerModel,
} from '../../domain/usecases/Player/login';
import { IFindByEmailAndPassword as IFindByEmailAndPasswordRepository } from '../../repositories/Player/interfaces/IFindByEmailAndPassword';

class LoginPlayerService implements ILoginPlayer {
  private findByEmailAndPassword;

  constructor(findByEmailAndPassword: IFindByEmailAndPasswordRepository) {
    this.findByEmailAndPassword = findByEmailAndPassword;
  }

  async loginPlayer(player: LoginPlayerModel): Promise<string> {
    const playerFound =
      await this.findByEmailAndPassword.findByEmailAndPassword(player);

    const token = jwt.sign(
      { id: playerFound.id, email: playerFound.email },
      process.env.JWT_SECRET as string,
      {
        expiresIn: '7d',
      },
    );

    return token;
  }
}

export default LoginPlayerService;
