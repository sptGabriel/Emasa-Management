import { BaseController } from '@shared/core/baseController';
import { NextFunction, Request, Response } from 'express';
import { container, singleton } from 'tsyringe';
import { WithdrawalComponentDTO } from '../application/useCases/withdrawalProduct/withdrawalProduct_DTO';
import { WithdrawalComponentUseCase } from '../application/useCases/withdrawalProduct/withdrawalProduct';
@singleton()
export class WithdrawalController extends BaseController {
  constructor() {
    super();
    this.path = '/withdrawal';
    this.initRouter();
  }
  protected initRouter() {
    this.router.get(`${this.path}`, this.index);
    this.router.post(`${this.path}/product`, this.withdrawalProduct);
  }
  private index = async (arg0: string, index: any) => {
    throw new Error('Method not implemented.');
  };
  private withdrawalProduct = async (
    request: Request,
    response: Response,
    next: NextFunction,
  ) => {
    try {
      const dto: WithdrawalComponentDTO = request.body;
      const result = await container
        .resolve(WithdrawalComponentUseCase)
        .execute(dto);
      if (result.isLeft()) return next(result.value);
      return response.json(result.value);
    } catch (error) {
      console.log(error);
      next(error);
    }
  };
}
