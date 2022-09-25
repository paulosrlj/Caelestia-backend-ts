import { Request, Response } from 'express';
import { ILoginPlayer } from '../../domain/usecases/Player/login';
import ValidationError from '../../exceptions/ValidationError';
import { loginPlayerSchema } from '../../helpers/validationSchemas/playerSchema';
import { IFindById } from '../interfaces/findById';

class LoginPlayerController implements IFindById {
  private loginPlayer;

  constructor(loginPlayer: ILoginPlayer) {
    this.loginPlayer = loginPlayer;
  }

  async handle(req: Request, res: Response): Promise<Express.Response> {
    try {
      await loginPlayerSchema.validateAsync(req.body);
    } catch (error: any) {
      if (error.isJoi) throw new ValidationError(error.name, error.details);
    }
    const token = await this.loginPlayer.loginPlayer(req.body);

    return res.status(200).json({
      token: token.token,
      email: req.body.email,
      password: req.body.password,
      id: token.player.id,
      userType: 'player',
    });
  }
}

export default LoginPlayerController;
