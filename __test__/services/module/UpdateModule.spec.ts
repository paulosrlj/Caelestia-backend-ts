import { Module } from '../../../src/domain/entities';
import {
  IUpdateModuleRepository,
  UpdateModuleModel,
} from '../../../src/repositories/interfaces/IUpdateModuleRepository';

import UpdateModuleService from '../../../src/services/module/UpdateModuleService';

// Definindo o módulo a ser retornado do banco de dados
const fakePersistedModule = {
  id: '1248d8asdaf',
  name: 'Módulo fake atualizado',
  createdAt: new Date(),
  updatedAt: new Date(),
};

// Módulo a ser usado na requisição
const moduleToUpdate = {
  name: 'Módulo fake atualizado',
};

// Criando um mock pro repositório
const makeUpdateModuleRepository = () => {
  class UpdateModuleRepositoryStub implements IUpdateModuleRepository {
    update(id: string, module: UpdateModuleModel): Promise<Module> {
      return new Promise(resolve => resolve(fakePersistedModule));
    }
  }

  return new UpdateModuleRepositoryStub();
};

// Colocando o mock na classe de service
const makeSut = () => {
  const updateModuleStub = makeUpdateModuleRepository();
  const sut = new UpdateModuleService(updateModuleStub);

  return { updateModuleStub, sut };
};

describe('Update module service unit tests', () => {
  test('Should return a module updated', async () => {
    const { sut } = makeSut();

    const createdModule = await sut.update('1', moduleToUpdate);

    expect(createdModule).toEqual(fakePersistedModule);
  });
});
