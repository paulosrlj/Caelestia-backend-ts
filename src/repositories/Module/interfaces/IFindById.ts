import { Module } from '../../../domain/entities';

export interface IFindModuleById {
  findById(id: string): Promise<Module | null>;
}
