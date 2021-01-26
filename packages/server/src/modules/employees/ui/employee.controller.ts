import { BaseController } from '@shared/core/baseController';
import { NextFunction, Request, Response } from 'express';
import { container, singleton } from 'tsyringe';
import { NewEmployeeDTO } from '../application/useCases/newEmployee/newEmployee_DTO';
import { NewEmployeeUseCase } from '../application/useCases/newEmployee/newEmployee';
import { changePasswordDTO } from '@modules/users/application/useCases/changePassword/changeUserPassword_DTO';
import { ChangePasswordUseCase } from '@modules/users/application/useCases/changePassword/changeUserPassword';
import { changeLoginDTO } from '@modules/users/application/useCases/changeLogin/changeLogin_DTO';
import { ChangeLoginUseCase } from '@modules/users/application/useCases/changeLogin/changeLogin';
import { getRequestIpAddress } from '@utils/getIpAddres';
@singleton()
export class EmployeeController extends BaseController {
  constructor() {
    super();
    this.path = '/employees';
    this.initRouter();
  }
  protected initRouter() {
    this.router.get(`${this.path}`, this.index);
    this.router.post(`${this.path}/add`, this.createEmployee);
    this.router.put(
      `${this.path}/:matricula/changePassword`,
      this.changePassword,
    );
    this.router.put(`${this.path}/:matricula/changeLogin`, this.changeLogin);
  }
  private index = async (arg0: string, index: any) => {
    throw new Error('Method not implemented.');
  };
  private changePassword = async (
    request: Request,
    response: Response,
    next: NextFunction,
  ) => {
    try {
      const {
        old_password,
        password_confirm,
        password,
      }: changePasswordDTO = request.body;
      const { matricula } = request.params;
      const result = await container
        .resolve(ChangePasswordUseCase)
        .execute({ password, password_confirm, old_password, matricula });
      if (result.isLeft()) return next(result.value);
      return response.json(result.value);
    } catch (error) {
      console.log(error);
      next(error);
    }
  };
  private changeLogin = async (
    request: Request,
    response: Response,
    next: NextFunction,
  ) => {
    try {
      const { login }: changeLoginDTO = request.body;
      const { matricula } = request.params;
      const result = await container
        .resolve(ChangeLoginUseCase)
        .execute({ matricula, login });
      if (result.isLeft()) return next(result.value);
      return response.json(result.value);
    } catch (error) {
      console.log(error);
      next(error);
    }
  };
  private createEmployee = async (
    request: Request,
    response: Response,
    next: NextFunction,
  ) => {
    try {
      const ipAddres = getRequestIpAddress(request)
      if(!ipAddres) throw new Error(` Not is possile check ip`)
      const dto: NewEmployeeDTO = request.body;
      const result = await container.resolve(NewEmployeeUseCase).execute(dto);
      if (result.isLeft()) return next(result.value);
      return response.json(result.value);
    } catch (error) {
      console.log(error);
      next(error);
    }
  };
}
