import { ErrorRequestHandler } from 'express';
import AlreadyExists from './AlreadyExists';
import BadRequest from './BadRequest';
import NotFound from './NotFound';
import ValidationError from './ValidationError';

const globalExceptionHandler: ErrorRequestHandler = (err, req, res, next) => {
  if (err instanceof ValidationError) {
    const errors = err.errors?.map(e => e.message);

    return res.status(err.code).json({
      error: err.message,
      validationErrors: errors,
      code: err.code,
    });
  }

  if (
    err instanceof NotFound ||
    err instanceof AlreadyExists ||
    err instanceof BadRequest
  ) {
    return res.status(err.code).json({ error: err.message, code: err.code });
  }

  // return res.status(500).json({ error: err.message, code: err.code });
  return next(err);
};

export default globalExceptionHandler;
