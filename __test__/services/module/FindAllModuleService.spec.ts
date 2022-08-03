import { Module } from '../../../src/domain/entities';
import { IFindAllModuleRepository } from '../../../src/repositories/interfaces/IFindAllModuleRepository';

import FindAllModuleService from '../../../src/services/module/FindAllModuleService';

// Definindo o módulo a ser retornado do banco de dados
const fakePersistedModules = [
  {
    id: '1248d8asdaf',
    name: 'Módulo fake',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'fh81afs23',
    name: 'Módulo fake 2',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

// Criando um mock pro repositório
const makeFindAllModuleRepository = () => {
  class FindAllModuleRepositoryStub implements IFindAllModuleRepository {
    findAll(): Promise<Module[]> {
      return new Promise(resolve => resolve(fakePersistedModules));
    }
  }

  return new FindAllModuleRepositoryStub();
};

// Colocando o mock na classe de service
const makeSut = () => {
  const findAllModules = makeFindAllModuleRepository();
  const sut = new FindAllModuleService(findAllModules);

  return { findAllModules, sut };
};

describe('FindById module service unit tests', () => {
  test('Should return a module when id is provided', async () => {
    const { sut } = makeSut();

    const modules = await sut.findAll();

    expect(modules).toEqual(fakePersistedModules);
  });
});
