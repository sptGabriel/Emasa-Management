import { BaseController } from '@shared/core/baseController';
import { NextFunction, Request, Response } from 'express';
import { container, singleton } from 'tsyringe';
import { CreateEmployeeDTO } from '../application/dtos/createEmployee_DTO';
import { CreateEmployeeUseCase } from '../application/useCases/createEmployee';
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
  }
  private index = async (arg0: string, index: any) => {
    throw new Error('Method not implemented.');
  };
  private createEmployee = async (
    request: Request,
    response: Response,
    next: NextFunction,
  ) => {
    try {
      const dto: CreateEmployeeDTO = request.body;
      const result = await container
        .resolve(CreateEmployeeUseCase)
        .execute(dto);
      if (result.isLeft()) return next(result.value);
      return response.json(result.value);
    } catch (error) {
      console.log(error);
      next(error);
    }
  };
}
