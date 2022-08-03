import { Module } from '../../../domain/entities';

export interface UpdateModuleModel {
  name?: string;
}

export interface IUpdateModule {
  update(id: string, module: UpdateModuleModel): Promise<Module>;
}
