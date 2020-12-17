import { RefreshTokenUseCase } from '@modules/auth/useCases/refreshToken/refreshToken';
import { NextFunction, Request, Response } from 'express';
import { container } from 'tsyringe';
import { IBootstrap } from '../bootstrap';

export const serverStatRouter = async (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  try {
		const server = container.resolve<IBootstrap>('bootstrap');
		if(!server.getDatabaseORM().getConnection().isConnected())
		throw new Error(`Internal Error`)
		const id = request.cookies['emsi'];
		const refreshToken = request.cookies['@Emasa/Refresh-Token'];
		if(!refreshToken) return response.status(200);
    const result = await container
      .resolve(RefreshTokenUseCase)
      .execute({ refreshToken, id });
    if (result.isLeft()) return response.status(401);
		response.cookie('emsi', result.value.user_id);
		response.cookie('@Emasa/Refresh-Token', result.value.refreshToken, {
			httpOnly: true,
			path: '/api/v1/users/me',
		});
		response.header('Authorization', 'Bearer '+ result.value.acessToken);
		return response.status(200);
  } catch (error) {
    console.log(error);
    next(error);
  }
};
