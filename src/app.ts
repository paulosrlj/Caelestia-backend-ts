import express, { Request, Response, Express } from 'express';
import cors from 'cors';
import morgan from 'morgan';

import corsOptions from './config/corsOptions';

class App {
  app: Express;

  routes() {
    this.app.get('/', (req: Request, res: Response) => {
      console.log('Oi');

      return res.json({ ok: 'ok' });
    });

    this.app.post('/', async (req: Request, res: Response) => {
      console.log(req.body);
      return res.json({ ok: 'ok' });
    });
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
  }
}

const { app } = new App();

export default app;
