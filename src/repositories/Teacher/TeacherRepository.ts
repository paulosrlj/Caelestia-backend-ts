import { Prisma, PrismaClient } from '@prisma/client';
import { Teacher } from '../../domain/entities/Teacher';
import { createTeacherModel } from '../../domain/usecases/Teacher/create-teacher';
import AlreadyExists from '../../exceptions/AlreadyExists';
import NotFound from '../../exceptions/NotFound';
import { ICreateTeacher } from './interfaces/ICreateTeacher';
import { ILoginTeacher } from './interfaces/ILoginTeacher';

class TeacherRepository implements ICreateTeacher, ILoginTeacher {
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

  async loginTeacher(email: string): Promise<Teacher> {
    const teacher = await this.prismaClient.teacher.findFirst({
      where: { email },
      select: {
        id: true,
        email: true,
        password: true,
      },
    });

    if (teacher === null) {
      throw new NotFound(`O professor de email ${email} não existe`);
    }

    return teacher;
  }
}

export default TeacherRepository;
