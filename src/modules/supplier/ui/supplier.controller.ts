import { CreateSupplierDTO } from '@modules/supplier/application/dtos/createSupplier_DTO';
import { BaseController } from '@shared/core/baseController';
import { NextFunction, Request, Response } from 'express';
import { container, singleton } from 'tsyringe';
import { CreateSupplierUseCase } from '../application/useCases/createSupplier';
@singleton()
export class SupplierController extends BaseController {
  constructor() {
    super();
    this.path = '/supplier';
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
      const dto: CreateSupplierDTO = request.body;
      const result = await container
        .resolve(CreateSupplierUseCase)
        .execute(dto);
      if (result.isLeft()) return next(result.value);
      return response.json(result.value);
    } catch (error) {
      next(error);
    }
  };
}