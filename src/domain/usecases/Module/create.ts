import { Module } from '../../entities';

export interface CreateModuleModel {
  name: string;
}

export interface ICreateModule {
  create(module: CreateModuleModel): Promise<Module>;
}
