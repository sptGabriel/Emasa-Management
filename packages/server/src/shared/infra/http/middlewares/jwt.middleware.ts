import { NextFunction, Request, Response } from 'express';
import authConfig from '@config/jwt.config';
import { promisifyDecode } from '@shared/helpers/jwt';
import { ensure } from '@utils/ensure';
export async function jwtMiddleware (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const token = ensure(
    req.headers.authorization &&
    req.headers.authorization.split(' ')[1],
  );
  if (!token) throw new Error(`Token doens't exist`);
  const decoded = await promisifyDecode(token, ensure(authConfig.secret));
  if(decoded instanceof Error) throw new Error(`Unauthorized`)
  return next()
};
