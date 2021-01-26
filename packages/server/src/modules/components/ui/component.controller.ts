import { BaseController } from '@shared/core/baseController';
import { NextFunction, Request, Response } from 'express';
import { container, singleton } from 'tsyringe';
import { transferDTO } from '../application/useCases/componentTransfer/transferDTO';
import { ComponentTransferUseCase } from '../application/useCases/componentTransfer/componentTransfer';
@singleton()
export class ComponentController extends BaseController {
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
      const dto: transferDTO = request.body;
      const result = await container
        .resolve(ComponentTransferUseCase)
        .execute(dto);
      if (result.isLeft()) return next(result.value);
      return response.json(result.value);
    } catch (error) {
      next(error);
    }
  };
}
