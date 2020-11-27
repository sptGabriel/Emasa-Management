import { RequestContext } from '@mikro-orm/core';
import { BaseController } from '@shared/core/baseController';
import { NextFunction, Request, Response } from 'express';
import { container, singleton } from 'tsyringe';
import { CreateDepartamentDTO } from '../application/useCases/newDepartament/newDepartament_DTO';
import { CreateDepartamentUseCase } from '../application/useCases/newDepartament/newDepartament';
@singleton()
export class DepartamentController extends BaseController {
  constructor() {
    super();
    this.path = '/departaments';
    this.initRouter();
  }
  protected initRouter() {
    this.router.get(`${this.path}`, this.index);
    this.router.post(`${this.path}/add`, this.createDepartament);
  }
  private index = async (arg0: string, index: any) => {
    throw new Error('Method not implemented.');
  };
  private createDepartament = async (
    request: Request,
    response: Response,
    next: NextFunction,
  ) => {
    try {
      const dto: CreateDepartamentDTO = request.body;
      const result = await container
        .resolve(CreateDepartamentUseCase)
        .execute(dto);
      if (result.isLeft()) return next(result.value);
      return response.json(result.value);
    } catch (error) {
      next(error);
    }
  };
}
