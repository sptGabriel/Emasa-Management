import { BaseController } from '@shared/core/baseController';
import { NextFunction, Request, Response } from 'express';
import { container, singleton } from 'tsyringe';
import { newUserDTO } from '../application/useCases/newUser/newUser_DTO';
import { NewUserUseCase } from '../application/useCases/newUser/addNewUser';
import { getRequestIpAddress } from '@utils/getIpAddres';
import { LoginUseCase } from '@modules/auth/useCases/login/login';
import { ensure } from '@utils/ensure';
import { loginDTO } from '@modules/auth/useCases/login/loginDTO';
import { LogoutUseCase } from '@modules/auth/useCases/logout/logout';
import { RefreshTokenUseCase } from '@modules/auth/useCases/refreshToken/refreshToken';
@singleton()
export class UserController extends BaseController {
  constructor() {
    super();
    this.path = '/users';
    this.initRouter();
  }
  protected initRouter() {
    this.router.get(`${this.path}`, this.index);
    this.router.post(`${this.path}/add`, this.addUser);
    this.router.post(`${this.path}/login`, this.login);
    this.router.get(`${this.path}/logout`, this.logout);
    this.router.get(`${this.path}/token/refresh`, this.refreshToken);
  }
  private index = async (arg0: string, index: any) => {
    throw new Error('Method not implemented.');
  };
  private addUser = async (
    request: Request,
    response: Response,
    next: NextFunction,
  ) => {
    try {
      const dto: newUserDTO = request.body;
      const result = await container.resolve(NewUserUseCase).execute(dto);
      if (result.isLeft()) return next(result.value);
      return response.json(result.value);
    } catch (error) {
      next(error);
    }
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
      response.cookie('Access-Token', result.value.access, {
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
