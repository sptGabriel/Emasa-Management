import { Request, Response, NextFunction } from 'express';
export const corsMiddleware = (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  response.header('Content-Type', 'application/json;charset=UTF-8');
  response.header('Access-Control-Allow-Headers', 'Set-Cookie');
  response.setHeader('Access-Control-Allow-Credentials', 'true');
  response.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  response.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept',
  );
  next();
};
