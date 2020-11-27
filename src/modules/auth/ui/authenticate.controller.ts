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
    this.router.get(`/logout`, this.logout);
    this.router.get(`/refresh-token`, this.refreshToken);
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
      dto.recent_ip = ensure(getRequestIpAddress(request))
      const result = await container.resolve(LoginUseCase).execute(dto);
      if (result.isLeft()) return next(result.value);
      response.cookie('eid', result.value.user.id);
      response.cookie('accToken', result.value.access, {
        expires: new Date(Date.now() + 2 * 60 * 60 * 1000),
        maxAge: 2 * 60 * 60 * 1000, //two hours
        httpOnly: true,
        secure: false,
      });
      return response.json(result.value.user);
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
      const id = request.cookies['eid'];
      const accToken = request.cookies['accToken'];
      const ip = ensure(getRequestIpAddress(request))
      const result = await container
        .resolve(LogoutUseCase)
        .execute({ accToken, id, ip });
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
      const ip =  ensure(getRequestIpAddress(request))
      const id = request.cookies['eid'];
      const result = await container
        .resolve(RefreshTokenUseCase)
        .execute({ id, ip });
      if (result.isLeft()) return next(result.value);
      response.cookie('eid', id);
      response.cookie('accToken', result.value.acessToken, {
        expires: new Date(Date.now() + 2 * 60 * 60 * 1000),
        maxAge: 2 * 60 * 60 * 1000, //two hours
        httpOnly: true,
        secure: false,
      });
      return response.json({ message: result.value.message });
    } catch (error) {
      next(error);
    }
  };
}
