import { Module } from '../../../src/domain/entities';
import NotFound from '../../../src/exceptions/NotFound';
import { IFindModuleById as IFindModuleByIdRepository } from '../../../src/repositories/Module/interfaces/IFindById';

import FindModuleByIdService from '../../../src/services/module/FindModuleByIdService';

// Definindo o módulo a ser retornado do banco de dados
const fakePersistedModule = {
  id: '1248d8asdaf',
  name: 'Módulo fake',
  createdAt: new Date(),
  updatedAt: new Date(),
};

// Criando um mock pro repositório
const makeFindByIdModuleRepository = () => {
  class FindByIdModuleRepositoryStub implements IFindModuleByIdRepository {
    findById(id: string): Promise<Module | null> {
      return new Promise(resolve => resolve(fakePersistedModule));
    }
  }

  return new FindByIdModuleRepositoryStub();
};

// Colocando o mock na classe de service
const makeSut = () => {
  const findByIdModuleStub = makeFindByIdModuleRepository();
  const sut = new FindModuleByIdService(findByIdModuleStub);

  return { findByIdModuleStub, sut };
};

describe('FindById module service unit tests', () => {
  test('Should return a module when id is provided', async () => {
    const { sut } = makeSut();

    const createdModule = await sut.findById('1');

    expect(createdModule).toEqual(fakePersistedModule);
  });

  test('Should throw a exception when a module does not exists', async () => {
    const { sut, findByIdModuleStub } = makeSut();

    jest
      .spyOn(findByIdModuleStub, 'findById')
      .mockReturnValueOnce(
        new Promise((resolve, reject) =>
          reject(new NotFound('O módulo não existe')),
        ),
      );

    expect(async () => {
      await sut.findById('1');
    }).rejects.toBeInstanceOf(NotFound);
  });
});
