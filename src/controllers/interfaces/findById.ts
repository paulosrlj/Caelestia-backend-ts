import { Request, Response } from 'express';

export interface IFindById {
  handle(req: Request, res: Response): Promise<Express.Response>;
}
