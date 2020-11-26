import { NextFunction, Request, Response } from 'express';
import authConfig from '@config/jwt.config';
import { decode, isTokenNOTExpired } from '@shared/helpers/jwt';
export const jwtMiddleware = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const token = req.get('accToken');
  if (!token) throw new Error(`Token doens't exist`);
  const decoded = decode(token, authConfig.secret);
  if(decoded && isTokenNOTExpired(decoded)) return next()
  throw new Error(`Unauthorized`)
};
