import { Request, Response } from 'express';

import { IFindById } from '../interfaces/findById';
import BadRequest from '../../exceptions/BadRequest';
import { IFindModuleById } from '../../domain/usecases/Module/findById';
import { Module } from '../../domain/entities';
import { TheoricLesson } from '../../domain/entities/TheoricLesson';
import { PraticalLesson } from '../../domain/entities/PraticalLesson';

interface FindModuleWithChildren extends Module {
  theoricLessons: TheoricLesson[];
  praticalLessons: PraticalLesson[];
}

class FindByIdModuleController implements IFindById {
  private findByIdService;

  constructor(findByIdService: IFindModuleById) {
    this.findByIdService = findByIdService;
  }

  async handle(req: Request, res: Response): Promise<Express.Response> {
    if (req.params.id === null) throw new BadRequest('O id não está presente');

    const module = (await this.findByIdService.findById(
      req.params.id,
    )) as FindModuleWithChildren;

    const responseModule = {
      id: module?.id,
      name: module?.name,
      theoricLessons: module?.theoricLessons,
      praticalLessons: module?.praticalLessons,
    };

    return res.status(200).json(responseModule);
  }
}

export default FindByIdModuleController;
