import { IDeleteModuleRepository } from '../../../src/repositories/interfaces/IDeleteModuleRepository';

import DeleteModuleService from '../../../src/services/module/DeleteModuleService';

// Criando um mock pro repositório
const makeDeleteModuleRepository = () => {
  class DeleteModuleRepositoryStub implements IDeleteModuleRepository {
    delete(id: string): Promise<void> {
      return new Promise(resolve => resolve());
    }
  }

  return new DeleteModuleRepositoryStub();
};

// Colocando o mock na classe de service
const makeSut = () => {
  const deleteModuleRepositoryStub = makeDeleteModuleRepository();
  const sut = new DeleteModuleService(deleteModuleRepositoryStub);

  return { deleteModuleRepositoryStub, sut };
};

describe('Delete module service unit tests', () => {
  test('Should return nothing after a module delete', async () => {
    const { sut, deleteModuleRepositoryStub } = makeSut();

    const deleteModuleSpy = jest.spyOn(deleteModuleRepositoryStub, 'delete');

    await sut.delete('1');

    expect(deleteModuleSpy).toHaveBeenCalledWith('1');
  });
});
