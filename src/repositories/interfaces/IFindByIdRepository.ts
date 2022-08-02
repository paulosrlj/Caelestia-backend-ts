import { Module } from '../../domain/entities';

export interface IFindModuleByIdRepository {
  findById(id: string): Promise<Module | null>;
}
