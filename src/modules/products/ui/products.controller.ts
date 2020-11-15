import { BaseController } from '@shared/core/baseController';
import { NextFunction, Request, Response } from 'express';
import { container, singleton } from 'tsyringe';
import { AssignProductDTO } from '../application/useCases/assignProduct/assignProduct_DTO';
import { CreateProductCategoryDTO } from '../application/useCases/addProductCategory/createProductCategory_DTO';
import { CreateProductDTO } from '../application/useCases/addProduct/createProduct_DTO';
import { AssignProductUseCase } from '../application/useCases/assignProduct/assignProduct';
import { CreateProductUseCase } from '../application/useCases/addProduct/createProduct';
import { CreateProductCategoryUseCase } from '../application/useCases/addProductCategory/createProductCategory';
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
    this.router.post(`${this.path}/assign`, this.assignProduct);
    this.router.post(`${this.path}/category/add`, this.createCategory);
  }
  private index = async (arg0: string, index: any) => {
    throw new Error('Method not implemented.');
  };
  private assignProduct = async (
    request: Request,
    response: Response,
    next: NextFunction,
  ) => {
    try {
      const dto: AssignProductDTO = request.body;
      const result = await container.resolve(AssignProductUseCase).execute(dto);
      if (result.isLeft()) return next(result.value);
      return response.json(result.value);
    } catch (error) {
      next(error);
    }
  };
  private createProduct = async (
    request: Request,
    response: Response,
    next: NextFunction,
  ) => {
    try {
      const dto: CreateProductDTO = request.body;
      const result = await container.resolve(CreateProductUseCase).execute(dto);
      if (result.isLeft()) return next(result.value);
      return response.json(result.value);
    } catch (error) {
      console.log(error);
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
      return response.json(result.value.toJSON());
    } catch (error) {
      next(error);
    }
  };
}
