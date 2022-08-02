import CreateModule from '../../../src/repositories/Module/CreateModule';

const sut = new CreateModule();

describe('Module respository integration tests', () => {
  test('Should save a module to database', async () => {
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
});
