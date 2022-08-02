import prisma from '../../config/prismaClient';
import { IDeleteModuleById } from '../../domain/usecases/Module/delete';

class DeleteModuleById implements IDeleteModuleById {
  async delete(id: string): Promise<void> {
    await prisma.module.delete({ where: { id } });
  }
}

export default DeleteModuleById;
