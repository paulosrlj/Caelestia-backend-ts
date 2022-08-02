import { Module } from '../../entities';

export interface IFindModuleById {
  findById(id: string): Promise<Module | null>;
}
