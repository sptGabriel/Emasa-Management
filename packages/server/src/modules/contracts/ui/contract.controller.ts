import { BaseController } from '@shared/core/baseController';
import { NextFunction, Request, Response } from 'express';
import { container, singleton } from 'tsyringe';
import { CreateContractDTO } from '../application/useCases/newContract/createContract_DTO';
import { CreateContractUseCase } from '../application/useCases/newContract/createContract';
@singleton()
export class ContractController extends BaseController {
  constructor() {
    super();
    this.path = '/contracts';
    this.initRouter();
  }
  protected initRouter() {
    this.router.get(`${this.path}`, this.index);
    this.router.post(`${this.path}/add`, this.createContract);
  }
  private index = async (arg0: string, index: any) => {
    throw new Error('Method not implemented.');
  };
  private createContract = async (
    request: Request,
    response: Response,
    next: NextFunction,
  ) => {
    try {
      const dto: CreateContractDTO = request.body;
      const result = await container
        .resolve(CreateContractUseCase)
        .execute(dto);
      if (result.isLeft()) return next(result.value);
      return response.json(result.value);
    } catch (error) {
      next(error);
    }
  };
}
