import { NotFoundError } from '@prisma/client/runtime';
import prisma from '../../../src/config/prismaClient';
import CreateModule from '../../../src/repositories/Module/CreateModule';
import FindModuleById from '../../../src/repositories/Module/FindModuleById';
import DeleteModule from '../../../src/repositories/Module/DeleteModule';

describe('Module respository integration tests', () => {
  beforeAll(async () => {
    const deleteModule = prisma.module.deleteMany();
    await prisma.$transaction([deleteModule]);
  });

  test('Should save a module to database', async () => {
    const sut = new CreateModule();

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
    const sut = new FindModuleById();

    const moduleToPersist = { name: 'Módulo para persistir' };

    const persistedModule = await prisma.module.create({
      data: moduleToPersist,
    });

    const moduleFound = await sut.findById(persistedModule.id);

    expect(moduleFound).toEqual(persistedModule);
  });

  test('Should throw NotFoundError after delete a module by id', async () => {
    const sut = new DeleteModule();

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
});
