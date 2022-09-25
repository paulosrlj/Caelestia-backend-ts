import { Module } from '../../entities';

export interface CreateModuleModel {
  name: string;
  achievementId: string;
}

export interface ICreateModule {
  create(module: CreateModuleModel): Promise<Module>;
}
