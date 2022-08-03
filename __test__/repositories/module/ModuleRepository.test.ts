import { NotFoundError } from '@prisma/client/runtime';
import prisma from '../../../src/config/prismaClientTest';

import ModuleRepository from '../../../src/repositories/Module/ModuleRepository';

const makeSut = () => {
  return new ModuleRepository(prisma);
};

describe('Module respository integration tests', () => {
  beforeAll(async () => {
    const deleteModule = prisma.module.deleteMany();
    await prisma.$transaction([deleteModule]);
  });

  test('Should save a module to database', async () => {
    const sut = makeSut();

    const moduleToSave = {
      name: 'Modulo 1',
    };

    const createdModule = await sut.create(moduleToSave);

    expect(createdModule).toEqual({
      id: expect.any(String),
      name: 'Modulo 1',
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
    });
  });

  test('Should find a module by id', async () => {
    const sut = makeSut();

    const moduleToPersist = { name: 'Módulo para persistir' };

    const persistedModule = await prisma.module.create({
      data: moduleToPersist,
    });

    const moduleFound = await sut.findById(persistedModule.id);

    expect(moduleFound).toEqual(persistedModule);
  });

  test('Should throw NotFoundError after delete a module by id', async () => {
    const sut = makeSut();

    const moduleToPersist = { name: 'Módulo para persistir' };

    const persistedModule = await prisma.module.create({
      data: moduleToPersist,
    });

    await sut.delete(persistedModule.id);

    expect(async () => {
      await prisma.module.findFirstOrThrow({
        where: { id: persistedModule.id },
      });
    }).rejects.toBeInstanceOf(NotFoundError);
  });

  test('Should return all modules', async () => {
    const sut = makeSut();
    const moduleToPersist = { name: 'Módulo para persistir' };
    const moduleToPersist2 = { name: 'Módulo para persistir 2' };

    const modules = [moduleToPersist, moduleToPersist2];

    await prisma.module.createMany({
      data: modules,
    });

    const modulesFound = await sut.findAll();

    modulesFound.forEach(module =>
      expect(module).toEqual({
        id: expect.any(String),
        name: expect.any(String),
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
      }),
    );
  });

  test('Should update a module name', async () => {
    const sut = makeSut();

    const moduleToPersist = { name: 'Módulo para persistir' };
    const persistedModule = await prisma.module.create({
      data: moduleToPersist,
    });

    const dataToUpdate = { name: 'Módulo com nome atualizado' };

    const updatedModule = await sut.update(persistedModule.id, dataToUpdate);

    expect(updatedModule).toEqual({
      id: expect.any(String),
      name: dataToUpdate.name,
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
    });
  });
});
