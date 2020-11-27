import { NextFunction, Request, Response } from 'express';
import authConfig from '@config/jwt.config';
import { decode, promisifyDecode,isTokenNOTExpired } from '@shared/helpers/jwt';
export const jwtMiddleware = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const token = req.get('accToken');
  if (!token) throw new Error(`Token doens't exist`);
  const decoded = promisifyDecode(token, authConfig.secret);
  if(decoded instanceof Error) throw new Error(`Unauthorized`)
  return next()
};
