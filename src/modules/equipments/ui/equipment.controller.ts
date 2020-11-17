import { BaseController } from '@shared/core/baseController';
import { NextFunction, Request, Response } from 'express';
import { container, singleton } from 'tsyringe';
import { AssignEquipmentDTO } from '../application/useCases/assignEquipment/assignEquipment_DTO';
import { AssignEquipmentUseCase } from '../application/useCases/assignEquipment/assignEquipment';
@singleton()
export class EquipmentsController extends BaseController {
  constructor() {
    super();
    this.path = '/equipments';
    this.initRouter();
  }
  protected initRouter() {
    this.router.get(`${this.path}`, this.index);
    this.router.post(`${this.path}/assign`, this.assignEquipment);
  }
  private index = async (arg0: string, index: any) => {
    throw new Error('Method not implemented.');
  };
  private assignEquipment = async (
    request: Request,
    response: Response,
    next: NextFunction,
  ) => {
    try {
      const dto: AssignEquipmentDTO = request.body;
      const result = await container
        .resolve(AssignEquipmentUseCase)
        .execute(dto);
      if (result.isLeft()) return next(result.value);
      return response.json(result.value);
    } catch (error) {
      next(error);
    }
  };
}
