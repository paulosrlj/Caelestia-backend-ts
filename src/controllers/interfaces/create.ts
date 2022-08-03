import { Request, Response } from 'express';

export interface ICreate {
  handle(req: Request, res: Response): Promise<Express.Response>;
}
