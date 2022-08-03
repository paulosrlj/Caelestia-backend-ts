import prisma from '../../config/prismaClient';
import NotFound from '../../exceptions/NotFound';
import { IDeleteModuleRepository } from '../interfaces/IDeleteModuleRepository';

class DeleteModuleById implements IDeleteModuleRepository {
  async delete(id: string): Promise<void> {
    const module = await prisma.module.findFirst({ where: { id } });

    if (module === null) {
      throw new NotFound(`Módulo de id ${id} não existe`);
    }

    await prisma.module.delete({ where: { id } });
  }
}

export default DeleteModuleById;
