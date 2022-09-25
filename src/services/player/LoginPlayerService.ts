import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import {
  ILoginPlayer,
  LoginPlayerModel,
} from '../../domain/usecases/Player/login';
import { ILoginPlayer as ILoginPlayerRepository } from '../../repositories/Player/interfaces/ILoginPlayer';
import WrongPassword from '../../exceptions/WrongPassword';

class LoginPlayerService implements ILoginPlayer {
  private loginPlayerRepository;

  constructor(loginPlayerRepository: ILoginPlayerRepository) {
    this.loginPlayerRepository = loginPlayerRepository;
  }

  async loginPlayer(player: LoginPlayerModel): Promise<any> {
    const playerFound = await this.loginPlayerRepository.loginPlayer(
      player.email,
    );

    const comparation = await bcrypt.compare(
      player.password,
      playerFound.password as string,
    );
    if (!comparation) {
      throw new WrongPassword(`A senha está incorreta`);
    }

    const token = jwt.sign(
      { id: playerFound.id, email: playerFound.email },
      process.env.JWT_SECRET as string,
      {
        expiresIn: '7d',
      },
    );

    return { token, player: playerFound };
  }
}

export default LoginPlayerService;
