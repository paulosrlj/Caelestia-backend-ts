import { ErrorRequestHandler } from 'express';
import NotFound from './NotFound';

const globalExceptionHandler: ErrorRequestHandler = (err, req, res, next) => {
  if (err instanceof NotFound) {
    return res.status(err.code).json({ error: err.message, code: err.code });
  }

  return next(err);
};

export default globalExceptionHandler;
