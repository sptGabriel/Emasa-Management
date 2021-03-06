import { RequestContext } from '@mikro-orm/core';
import { BaseController } from '@shared/core/baseController';
import { NextFunction, Request, Response } from 'express';
import { container, singleton } from 'tsyringe';
import { CreateDepartamentDTO } from '../application/useCases/newDepartament/newDepartament_DTO';
import { CreateDepartamentUseCase } from '../application/useCases/newDepartament/newDepartament';
import { Pagination } from '@shared/core/pagination';
import { GetDepartamentsUseCase } from '../application/useCases/getDepartaments/getDepartaments';
import { GetTotalRowsUseCase } from '../application/useCases/getTotalRows';
import { getByID } from '../application/useCases/getById';
import { getLogs } from '../application/useCases/getByLogs';
@singleton()
export class DepartamentController extends BaseController {
  constructor() {
    super();
    this.path = '/departaments';
    this.initRouter();
  }
  protected initRouter() {
    this.router.get(`${this.path}/count`, this.count);
    this.router.get(`${this.path}/logs/:id`, this.logsById);
    this.router.get(`${this.path}/:id`, this.byId);
    this.router.get(`${this.path}`, this.getDepartaments);
    this.router.post(`${this.path}/add`, this.createDepartament);
    this.router.post(`${this.path}/`, this.getDepartaments);
  }
  private byId = async (
    request: Request,
    response: Response,
    next: NextFunction,
  ) => {
    try {
      const { id } = request.params;
      const result = await container.resolve(getByID).execute(id);
      if (result.isLeft()) return next(result.value);
      return response.json(result.value);
    } catch (error) {
      next(error);
    }
  };
  private logsById = async (
    request: Request,
    response: Response,
    next: NextFunction,
  ) => {
    try {
      const { id } = request.params;
      const result = await container.resolve(getLogs).execute(id);
      if (result.isLeft()) return next(result.value);
      return response.json(result.value);
    } catch (error) {
      next(error);
    }
  };
  private index = async (arg0: string, index: any) => {
    throw new Error('Method not implemented.');
  };
  private count = async (
    request: Request,
    response: Response,
    next: NextFunction,
  ) => {
    try {
      console.log('enter herr1');
      const result = await container.resolve(GetTotalRowsUseCase).execute();
      if (result.isLeft()) return next(result.value);
      return response.json(result.value);
    } catch (error) {
      next(error);
    }
  };
  private getDepartaments = async (
    request: Request,
    response: Response,
    next: NextFunction,
  ) => {
    try {
      const pagination = Pagination.fromRequest(request);
      console.log(pagination);
      const result = await container
        .resolve(GetDepartamentsUseCase)
        .execute({ pagination });
      if (result.isLeft()) return next(result.value);
      return response.json(result.value);
    } catch (error) {
      next(error);
    }
  };
  private createDepartament = async (
    request: Request,
    response: Response,
    next: NextFunction,
  ) => {
    try {
      const { departament_name, sigla }: CreateDepartamentDTO = request.body;
      const { statusCode, url, method, baseUrl } = request;
      const result = await container.resolve(CreateDepartamentUseCase).execute({
        departament_name,
        sigla,
        code: statusCode || 500,
        url: '/v1' + url,
        method,
      });
      if (result.isLeft()) return next(result.value);
      return response.json(result.value);
    } catch (error) {
      next(error);
    }
  };
}
