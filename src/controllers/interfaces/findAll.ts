import { Request, Response } from 'express';

export interface IFindAll {
  handle(req: Request, res: Response): Promise<Express.Response>;
}
