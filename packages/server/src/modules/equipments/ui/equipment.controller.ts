import { BaseController } from '@shared/core/baseController';
import { NextFunction, Request, Response } from 'express';
import { container, singleton } from 'tsyringe';
import { EquipmentAssignmentDTO } from '../application/useCases/equipmentAssignment/equipmentAssignment_DTO';
import { EquipmentAssignmentUseCase } from '../application/useCases/equipmentAssignment/equipmentAssignment';
import { EquipmentTransferUseCase } from '../application/useCases/equipmentTransfer/equipmentTransfer'
import { transferDTO } from '../application/useCases/equipmentTransfer/transferDTO';
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
    this.router.post(`${this.path}/transfer`, this.equipmentTransfer);
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
      const dto: EquipmentAssignmentDTO = request.body;
      const result = await container
        .resolve(EquipmentAssignmentUseCase)
        .execute(dto);
      if (result.isLeft()) return next(result.value);
      return response.json(result.value.toJSON());
    } catch (error) {
      console.log(error);
      next(error);
    }
  };
  private equipmentTransfer = async (
    request: Request,
    response: Response,
    next: NextFunction,
  ) => {
    try {
      const dto: transferDTO = request.body;
      const result = await container
        .resolve(EquipmentTransferUseCase)
        .execute(dto);
      if (result.isLeft()) return next(result.value);
      return response.json(result.value);
    } catch (error) {
      next(error);
    }
  };
}
