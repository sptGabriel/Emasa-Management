import { BaseController } from '@shared/core/baseController';
import { ensure } from '@utils/ensure';
import { getRequestIpAddress } from '@utils/getIpAddres';
import { NextFunction, Request, Response } from 'express';
import { container, singleton } from 'tsyringe';
import { LoginUseCase } from '../useCases/login/login';
import { loginDTO } from '../useCases/login/loginDTO';
import { LogoutUseCase } from '../useCases/logout/logout';
import { RefreshTokenUseCase } from '../useCases/refreshToken/refreshToken';
@singleton()
export class AuthController extends BaseController {
  constructor() {
    super();
    this.initRouter();
  }
  protected initRouter() {
    this.router.get(`${this.path}`, this.index);
    this.router.post(`/login`, this.login);
    this.router.get(`/users/me/logout`, this.logout);
    this.router.get(`/users/me/refresh-token`, this.refreshToken);
  }
  private index = async (arg0: string, index: any) => {
    throw new Error('Method not implemented.');
  };
  private login = async (
    request: Request,
    response: Response,
    next: NextFunction,
  ) => {
    try {
      const dto: loginDTO = request.body;
      dto.ip = ensure(getRequestIpAddress(request));
      const result = await container.resolve(LoginUseCase).execute(dto);
      if (result.isLeft()) return next(result.value);
      response.cookie('emsi', result.value.user.id);
      response.cookie('@Emasa/Refresh-Token', result.value.refresh, {
        httpOnly: true,
        path: '/api/v1/users/me',
      });
      return response.json({access_token: result.value.access});
    } catch (error) {
      next(error);
    }
  };
  private logout = async (
    request: Request,
    response: Response,
    next: NextFunction,
  ) => {
    try {
      const id = request.cookies['emsi'];
      const refreshToken = request.cookies['@Emasa/Refresh-Token'];
      const ip = ensure(getRequestIpAddress(request));
      response.clearCookie('emsi');
      response.clearCookie('@Emasa/Refresh-Token', {
        path: '/api/v1/users/me',
      });
      const result = await container
        .resolve(LogoutUseCase)
        .execute({ refreshToken, id, ip });
      if (result.isLeft()) return next(result.value);
      return response.json(result.value);
    } catch (error) {
      next(error);
    }
  };
  private refreshToken = async (
    request: Request,
    response: Response,
    next: NextFunction,
  ) => {
    try {
      const ip = ensure(getRequestIpAddress(request));
      const id = request.cookies['emsi'];
      const refreshToken = request.cookies['@Emasa/Refresh-Token'];
      const result = await container
        .resolve(RefreshTokenUseCase)
        .execute({ id, ip, refreshToken });
      if (result.isLeft()) return next(result.value);
      response.cookie('emsi', result.value.user_id);
      response.cookie('@Emasa/Refresh-Token', result.value.refreshToken, {
        httpOnly: true,
        path: '/api/v1/users/me',
      });
      return response.json({
        message: result.value.message,
        token: result.value.accessToken,
      });
    } catch (error) {
      console.log(error)
      next(error);
    }
  };
}
