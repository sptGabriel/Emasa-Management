import { BaseController } from '@shared/core/baseController';
import { NextFunction, Request, Response } from 'express';
import { container, singleton } from 'tsyringe';
import { CreateProductCategoryDTO } from '../application/dtos/createProductCategory_DTO';
import { CreateProductDTO } from '../application/dtos/createProduct_DTO';
import { CreateProductUseCase } from '../application/useCases/createProduct';
import { CreateProductCategoryUseCase } from '../application/useCases/createProductCategory';
@singleton()
export class ProductsController extends BaseController {
  constructor() {
    super();
    this.path = '/products';
    this.initRouter();
  }
  protected initRouter() {
    this.router.get(`${this.path}`, this.index);
    this.router.post(`${this.path}/add`, this.createProduct);
    this.router.post(`${this.path}/category/add`, this.createCategory);
  }
  private index = async (arg0: string, index: any) => {
    throw new Error('Method not implemented.');
  };
  private createProduct = async (
    request: Request,
    response: Response,
    next: NextFunction,
  ) => {
    try {
      const dto: CreateProductDTO = request.body;
      const result = await container
        .resolve(CreateProductUseCase)
        .execute(dto);
      if (result.isLeft()) return next(result.value);
      return response.json(result.value);
    } catch (error) {
      next(error);
    }
  };
  private createCategory = async (
    request: Request,
    response: Response,
    next: NextFunction,
  ) => {
    try {
      const dto: CreateProductCategoryDTO = request.body;
      const result = await container
        .resolve(CreateProductCategoryUseCase)
        .execute(dto);
      if (result.isLeft()) return next(result.value);
      return response.json(result.value);
    } catch (error) {
      next(error);
    }
  };
}