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
import prisma from './config/prismaClient';

class App {
  app: Express;

  routes() {
    this.app.get('/', async (req: Request, res: Response) => {
      // const theoricLesson = await prisma.theoricLesson.create({
      //   data: {
      //     lessonName: 'Lição teórica',
      //     xpEarned: 80,
      //     description: 'Descrição da lição',
      //     content: '{"message": "oi"}',
      //     moduleId: '30fb43b9-ae5b-4ade-9b44-dd478b24dac0',
      //   },
      // });
      // const theoricLesson = {
      //   lessonName: 'Lição teórica',
      //   xpEarned: 80,
      //   description: 'Descrição da lição',
      //   content: '{"message": "oi"}',
      // };
      // const module = await prisma.module.create({
      //   data: {
      //     name: 'Módulo de teste',
      //     theoricLessons: {
      //       create: [theoricLesson],
      //     },
      //   },
      // });

      // const modules = await prisma.module.findFirst({
      //   where: { id: '30fb43b9-ae5b-4ade-9b44-dd478b24dac0' },
      //   include: { theoricLessons: true },
      // });

      // console.log(modules);
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
  }

  middlewares() {
    this.app.use(morgan('dev'));
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
    this.app.use(cors(corsOptions));
  }

  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
    this.app.use(globalExceptionHandler);
  }
}

const { app } = new App();

export default app;
