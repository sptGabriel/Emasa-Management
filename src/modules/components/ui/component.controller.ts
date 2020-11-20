import { BaseController } from '@shared/core/baseController';
import { NextFunction, Request, Response } from 'express';
import { container, singleton } from 'tsyringe';
import { AssignComponentDTO } from '../application/useCases/transferComponent/transferDTO';
import { AssignComponentUseCase } from '../application/useCases/transferComponent/transferComponent';
@singleton()
export class ProductsController extends BaseController {
  constructor() {
    super();
    this.path = '/components';
    this.initRouter();
  }
  protected initRouter() {
    this.router.get(`${this.path}`, this.index);
    this.router.post(`${this.path}/transfer`, this.transferComponent);
  }
  private index = async (arg0: string, index: any) => {
    throw new Error('Method not implemented.');
  };
  private transferComponent = async (
    request: Request,
    response: Response,
    next: NextFunction,
  ) => {
    try {
      const dto: AssignComponentDTO = request.body;
      const result = await container
        .resolve(AssignComponentUseCase)
        .execute(dto);
      if (result.isLeft()) return next(result.value);
      return response.json(result.value);
    } catch (error) {
      next(error);
    }
  };
}
