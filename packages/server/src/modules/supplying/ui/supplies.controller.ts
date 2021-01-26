import { BaseController } from '@shared/core/baseController';
import { NextFunction, Request, Response } from 'express';
import { container, singleton } from 'tsyringe';
import { addSupplyDTO } from '@modules/supplying/application/useCases/newSupply/createSupply_DTO';
import { CreateSupplyUseCase } from '../application/useCases/newSupply/createSupply';
@singleton()
export class SuppliesController extends BaseController {
  constructor() {
    super();
    this.path = '/supplies';
    this.initRouter();
  }
  protected initRouter() {
    this.router.get(`${this.path}`, this.index);
    this.router.post(`${this.path}/add`, this.createSupplier);
  }
  private index = async (arg0: string, index: any) => {
    throw new Error('Method not implemented.');
  };
  private createSupplier = async (
    request: Request,
    response: Response,
    next: NextFunction,
  ) => {
    try {
      const dto: addSupplyDTO = request.body;
      const result = await container.resolve(CreateSupplyUseCase).execute(dto);
      if (result.isLeft()) return next(result.value);
      return response.json(result.value);
    } catch (error) {
      next(error);
    }
  };
}
