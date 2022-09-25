import express, { Request, Response, Express } from 'express';

import cors from 'cors';
import morgan from 'morgan';

import corsOptions from './config/corsOptions';
import globalExceptionHandler from './exceptions/GlobalExceptionHandler';
import moduleSchema from './helpers/validationSchemas/moduleSchema';
import ValidationError from './exceptions/ValidationError';

// Routes
import moduleRoutes from './routes/module.routes';
import theoricLessonRoutes from './routes/theoricLesson.routes';
import praticalLessonRoutes from './routes/praticalLesson.routes';
import playerRoutes from './routes/player.routes';
import achievementRoutes from './routes/achievement.routes';
import itemRoutes from './routes/item.routes';
import rankingRoutes from './routes/ranking.routes';
import teacherRoutes from './routes/teacher.routes';

import prisma from './config/prismaClient';

class App {
  app: Express;

  routes() {
    this.app.get('/', async (req: Request, res: Response) => {
      await prisma.player.delete({ where: { email: 'paulo2@gmail.com' } });
      // const module = await prisma.module.create({
      //   data: {
      //     name: 'Módulo de teste',
      //     theoricLessons: {
      //       create: [
      //         {
      //           lessonName: 'Lição teórica',
      //           xpEarned: 80,
      //           description: 'Descrição da lição',
      //           content: '{"message": "oi"}',
      //           // moduleId: '30fb43b9-ae5b-4ade-9b44-dd478b24dac0',
      //           coinsEarned: 110,
      //         },
      //       ],
      //     },
      //   },
      // });

      // const theoricLesson = await prisma.theoricLesson.create({
      //   data: {
      //     lessonName: 'Lição teórica 2',
      //     xpEarned: 80,
      //     description: 'Descrição da lição',
      //     content: '{"message": "oi"}',
      //     moduleId: '125c8b57-beb0-407d-928a-8f981df4ea9e',
      //     coinsEarned: 110,
      //   },
      // });
      // const theoricLesson = {
      //   lessonName: 'Lição teórica',
      //   xpEarned: 80,
      //   description: 'Descrição da lição',
      //   content: '{"message": "oi"}',
      // };

      // const modules = await prisma.module.findFirst({
      //   where: { id: '30fb43b9-ae5b-4ade-9b44-dd478b24dac0' },
      //   include: { theoricLessons: true },
      // });

      // console.log(modules);
      // const pData = {
      //   email: 'paulo2@gmail.com',
      //   password: '123456',
      //   name: 'Paulo',
      //   nickname: 'TogakureRyu2',
      // };

      // const player = await prisma.player.create({ data: pData });

      // await prisma.theoricLessonsFinished.create({
      //   data: {
      //     playerId: 'eddc12aa-907c-4102-9242-43207864f32e',
      //     theoricLessonId: theoricLesson.id,
      //   },
      // });

      // const item = await prisma.item.create({
      //   data: {
      //     name: 'Poção 2',
      //     description: 'Concede 10% de bonus de xp',
      //     price: 20,
      //     individualItemId: '2',
      //   },
      // });

      // const playeritem = await prisma.playerItem.create({
      //   data: {
      //     amount: 1,
      //     playerId: '23ba50cc-1a9f-47a8-90fa-cbec13cf5fb8',
      //     itemId: item.id,
      //   },
      // });

      // const buscado = await prisma.playerItem.findMany({
      //   select: {
      //     amount: true,
      //     item: {
      //       select: {
      //         id: true,
      //         description: true,
      //         name: true,
      //         individualItemId: true,
      //         price: true,
      //       },
      //     },
      //   },
      //   where: { playerId: '23ba50cc-1a9f-47a8-90fa-cbec13cf5fb8' },
      // });

      // const ranking = await prisma.ranking.create({
      //   data: {
      //     rankingName: 'Ferro',
      //     pointsToPromotion: 100,
      //     urlRankingBadge: 'http://www.google.com.br',
      //   },
      // });

      // const r = await prisma.playerRanking.create({
      //   data: {
      //     playerId: 'eddc12aa-907c-4102-9242-43207864f32e',
      //     rankingId: ranking.id,
      //     rankingTitle: 'Subterror',
      //     weeklyPoints: 0,
      //   },
      //   include: { player: true, ranking: true },
      // });
      // const day = new Date().getUTCDate();
      // const year = new Date().getUTCFullYear();
      // const month = new Date().getUTCMonth();

      // return res.json(
      //   await prisma.theoricLessonsFinished.findMany({
      //     where: {
      //       completionDate: {
      //         lte: new Date('2022-08-06'),
      //         gte: new Date('2022-08-01'),
      //       },
      //     },
      //     take: 5,
      //   }),
      // );

      return res.json({ ok: 'ok' });
    });

    this.app.post('/', async (req: Request, res: Response) => {
      try {
        const result = await moduleSchema.validateAsync(req.body);
      } catch (e: any) {
        console.log(e);
        if (e.isJoi) {
          throw new ValidationError(e.name, e.details);
        }
      }

      return res.json({ ok: 'ok' });
    });

    this.app.use('/modules', moduleRoutes);
    this.app.use('/theoricLessons', theoricLessonRoutes);
    this.app.use('/praticalLessons', praticalLessonRoutes);
    this.app.use('/players', playerRoutes);
    this.app.use('/achievements', achievementRoutes);
    this.app.use('/items', itemRoutes);
    this.app.use('/rankings', rankingRoutes);
    this.app.use('/teachers', teacherRoutes);
  }

  middlewares() {
    this.app.use(morgan('dev'));
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
    this.app.use(cors(corsOptions));
  }

  async createAdmin() {
    const admin = await prisma.admin.findFirst({
      where: { email: process.env.ADMIN_EMAIL! },
    });

    if (!admin) {
      prisma.admin.create({
        data: {
          email: process.env.ADMIN_EMAIL!,
          password: process.env.ADMIN_PASSWORD!,
        },
      });
    }
  }

  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
    this.app.use(globalExceptionHandler);
    this.createAdmin();
  }
}

const { app } = new App();

export default app;
