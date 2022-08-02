import { Module } from '../../domain/entities';

export interface IFindAllModuleRepository {
  findAll(): Promise<Module[]>;
}
