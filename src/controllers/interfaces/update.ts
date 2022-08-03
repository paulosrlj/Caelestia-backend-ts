import { Request, Response } from 'express';

export interface IUpdate {
  handle(req: Request, res: Response): Promise<Express.Response>;
}
