import { NextFunction, Request, Response } from 'express';
import authConfig from '@config/jwt.config';
import { decode } from '@shared/helpers/jwt';
export const jwtMiddleware = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (!req.headers.authorization) throw new Error(`Unauthorized`);
  const token = req.get('Authorization');
  if (!token) throw new Error(`Token doens't exist`);
  const decoded = decode(token, authConfig.secret);
  next();
};
