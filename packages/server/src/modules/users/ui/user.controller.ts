import { BaseController } from '@shared/core/baseController';
import { NextFunction, Request, Response } from 'express';
import { container, singleton } from 'tsyringe';
import { newUserDTO } from '../application/useCases/newUser/newUser_DTO';
import { NewUserUseCase } from '../application/useCases/newUser/addNewUser';
import { getRequestIpAddress } from '@utils/getIpAddres';
import { ensure } from '@utils/ensure';
import { getCurrentUserCase } from '../application/useCases/getCurrentUser/getCurrentUser';
@singleton()
export class UserController extends BaseController {
  constructor() {
    super();
    this.path = '/users';
    this.initRouter();
  }
  protected initRouter() {
    this.router.get(`${this.path}`, this.index);
    this.router.get(`${this.path}/me`, this.Me);
    this.router.post(`${this.path}/add`, this.addUser);
  }
  private index = async (arg0: string, index: any) => {
    throw new Error('Method not implemented.');
  };
  private Me = async (
    request: Request,
    response: Response,
    next: NextFunction,
  ) => {
    try {
      const ip =  ensure(getRequestIpAddress(request))
      const id = request.cookies['eid'];
      const accessToken = request.cookies['Access-Token']
      const result = await container
        .resolve(getCurrentUserCase)
        .execute({ token:accessToken, ip });
      if (result.isLeft()) return next(result.value);
    
      return response.json(result.value.getJWTPayload);
    } catch (error) {
      next(error);
    }
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
}
