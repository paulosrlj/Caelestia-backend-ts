import { Module } from '../../domain/entities';
import { CreateModuleModel } from '../../domain/usecases/Module/create';

export interface ICreateModuleRepository {
  create(module: CreateModuleModel): Promise<Module>;
}
