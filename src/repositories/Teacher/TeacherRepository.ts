import { Prisma, PrismaClient } from '@prisma/client';
import { Teacher } from '../../domain/entities/Teacher';
import { createTeacherModel } from '../../domain/usecases/Teacher/create-teacher';
import AlreadyExists from '../../exceptions/AlreadyExists';
import { ICreateTeacher } from './interfaces/ICreateTeacher';

class TeacherRepository implements ICreateTeacher {
  private prismaClient;

  constructor(
    prismaClient: PrismaClient<
      Prisma.PrismaClientOptions,
      never,
      Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined
    >,
  ) {
    this.prismaClient = prismaClient;
  }

  async create(teacherModel: createTeacherModel): Promise<Teacher> {
    const alreadyExists = await this.prismaClient.teacher.findFirst({
      where: { OR: [{ email: teacherModel.email }, { cpf: teacherModel.cpf }] },
    });

    if (alreadyExists) throw new AlreadyExists('O professor já existe');

    return this.prismaClient.teacher.create({ data: teacherModel });
  }
}

export default TeacherRepository;
