import { Module } from '../../entities';

export interface IFindAllModule {
  findAll(): Promise<Module[]>;
}
