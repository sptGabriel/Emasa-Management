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
      dto.ip = ensure(getRequestIpAddress(request))
      const result = await container.resolve(LoginUseCase).execute(dto);
      if (result.isLeft()) return next(result.value);
      response.cookie('eid', result.value.user.id);
      response.cookie('@Emasa/Access-Token', result.value.access);
      response.cookie('@Emasa/Refresh-Token', result.value.refresh);
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
      const accessToken = request.cookies['@Emasa/Access-Token']
      const refreshToken = request.cookies['@Emasa/Refresh-Token']
      const result = await container
        .resolve(RefreshTokenUseCase)
        .execute({ id, ip,accessToken,refreshToken });
      if (result.isLeft()) return next(result.value);
      response.cookie('eid', id);
      response.cookie('@Emasa/Access-Token', result.value.acessToken);
      response.cookie('@Emasa/Refresh-Token', result.value.refreshToken);
      return response.json({ message: result.value.message });
    } catch (error) {
      next(error);
    }
  };
}
