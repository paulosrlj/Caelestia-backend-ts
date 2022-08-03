import { Request, Response } from 'express';

export interface IDelete {
  handle(req: Request, res: Response): Promise<Express.Response>;
}
