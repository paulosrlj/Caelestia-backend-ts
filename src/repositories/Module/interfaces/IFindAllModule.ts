import { Module } from '../../../domain/entities';

export interface IFindAllModule {
  findAll(): Promise<Module[]>;
}
