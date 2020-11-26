import { BaseController } from '@shared/core/baseController';
import { oneMonth } from '@utils/oneMonth';
import { NextFunction, Request, Response } from 'express';
import { container, singleton } from 'tsyringe';
import { LoginUseCase } from '../useCases/login/login';
import { loginDTO } from '../useCases/login/loginDTO';
import { LogoutUseCase } from '../useCases/logout/logout';
import { LogoutDTO } from '../useCases/logout/logoutDTO';
import jwtConfig from '@config/jwt.config';
import { decode } from '@shared/helpers/jwt';
import { refreshTokenDTO } from '../useCases/refreshToken/refreshTokenDTO';
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
    this.router.post(`/logout`, this.logout);
    this.router.post(`/refresh-token`, this.refreshToken);
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
      const result = await container.resolve(LoginUseCase).execute(dto);
      if (result.isLeft()) return next(result.value);
      response.cookie('eid', result.value.user.matricula);
      response.cookie('accToken', result.value.access, {
        expires: new Date(Date.now() + 2 * 60 * 60 * 1000),
        maxAge: 2 * 60 * 60 * 1000, //two hours
        httpOnly: true,
        secure: false,
      });
      return response.json({
        user: result.value.user,
      });
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
      const dto: LogoutDTO = request.body;
      const result = await container.resolve(LogoutUseCase).execute(dto);
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
      const dto: refreshTokenDTO = request.body;
      const result = await container.resolve(RefreshTokenUseCase).execute(dto);
      if (result.isLeft()) return next(result.value);
      response.cookie('eid', dto.matricula);
      response.cookie('accToken', result.value.acessToken, {
        expires: new Date(Date.now() + 2 * 60 * 60 * 1000),
        maxAge: 2 * 60 * 60 * 1000, //two hours
        httpOnly: true,
        secure: false,
      });
      return response.json({
        message: 'Successfully authenticated',
      });
    } catch (error) {
      next(error);
    }
  };
}
