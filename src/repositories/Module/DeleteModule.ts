import prisma from '../../config/prismaClient';
import { IDeleteModuleRepository } from '../interfaces/IDeleteModuleRepository';

class DeleteModuleById implements IDeleteModuleRepository {
  async delete(id: string): Promise<void> {
    await prisma.module.delete({ where: { id } });
  }
}

export default DeleteModuleById;
