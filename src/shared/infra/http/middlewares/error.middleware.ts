import { NextFunction, Request, Response } from 'express';
import { AppError } from '../../../errors/BaseError';

export function ErrorMiddleware(
  error: any,
  request: Request,
  response: Response,
  next: NextFunction,
) {
  console.log(error)
  if (!(error instanceof AppError)) {
    return response.status(500).json({
      status: 'error',
      message: error.message,
    });
  }
  return response.status(error.code).json(error.message);
}
