import { Module } from '../../../src/domain/entities';
import { ICreateModule as ICreateModuleRepository } from '../../../src/repositories/Module/interfaces/ICreateModule';

import CreateModuleService from '../../../src/services/module/CreateModuleService';

// Definindo o módulo a ser retornado do banco de dados
const fakePersistedModule = {
  id: '1248d8asdaf',
  name: 'Módulo fake',
  createdAt: new Date(),
  updatedAt: new Date(),
};

// Módulo a ser usado na requisição
const moduleToSave = {
  name: 'Modulo 1',
};

// Criando um mock pro repositório
const makeCreateModuleRepository = () => {
  class CreateModuleRepositoryStub implements ICreateModuleRepository {
    async create(): Promise<Module> {
      return new Promise(resolve => resolve(fakePersistedModule));
    }
  }

  return new CreateModuleRepositoryStub();
};

// Colocando o mock na classe de service
const makeSut = () => {
  const createModuleStub = makeCreateModuleRepository();
  const sut = new CreateModuleService(createModuleStub);

  return { createModuleStub, sut };
};

describe('Create module service unit tests', () => {
  test('Should return a module', async () => {
    const { sut } = makeSut();

    const createdModule = await sut.create(moduleToSave);

    expect(createdModule).toEqual(fakePersistedModule);
  });
});
