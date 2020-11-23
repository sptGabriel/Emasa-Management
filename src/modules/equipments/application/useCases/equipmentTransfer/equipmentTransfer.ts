import { IDepartamentRepository } from '@modules/departaments/persistence/departamentRepository';
import { DepartamentRepository } from '@modules/departaments/persistence/departamentRepositoryImpl';
import { IComponentRepository } from '@modules/components/persistence/componentRepository';
import { ComponentRepository } from '@modules/components/persistence/componentRepositoryImpl';
import { Either, right } from '@shared/core/either';
import { IUseCase } from '@shared/core/useCase';
import { AppError } from '@shared/errors/BaseError';
import { inject, injectable } from 'tsyringe';
import { transferDTO } from './transferDTO';
import { ComponentTransfer } from '@modules/components/domain/componentTransfer.entity';
import { EquipmentRepository } from '@modules/equipments/persistence/equipmentRepositoryImpl';
import { IEquipmentRepository } from '@modules/equipments/persistence/equipmentRepository';
import { Component } from '@modules/components/domain/component.entity';
@injectable()
export class EquipmentTransferUseCase
  implements
    IUseCase<transferDTO, Promise<Either<AppError, ComponentTransfer>>> {
  constructor(
    @inject(DepartamentRepository)
    private departamentRepository: IDepartamentRepository,
    @inject(ComponentRepository)
    private componentRepository: IComponentRepository,
    @inject(EquipmentRepository)
    private equipmentRepository: IEquipmentRepository,
  ) {}
  private validateDepartaments = async (id: string) => {
    const departament = await this.departamentRepository.byId(id);
    if (!departament) throw new Error(`This departament doesn't exists`);
    return departament;
  };
  private validateEquipment = async (
    patrimony: string,
    newDepart: string,
  ) => {
    const equipment = await this.equipmentRepository.byPatrimony(patrimony);
    if (!equipment) throw new Error(`This Equipment doesn't exists`);
    if(equipment.component.departament.id === newDepart){
      throw new Error(`This equipment already belongs to that department`)
    }
    if (equipment.components.length < 0)  return [equipment.component];
    const components: Component[] = [equipment.component];
    for (let comp of equipment.components.getItems()) {
      if (comp.component.id !== equipment.component.id) {
        components.push(comp.component);
      }
    }
    return components.length > 0 ? components : [equipment.component];
  };
  public execute = async ({
    patrimony_code,
    description,
    new_departament,
  }: transferDTO): Promise<Either<AppError, ComponentTransfer>> => {
    // if (!description) throw new Error(`Invalid Description`);
    const hasDepartament = await this.validateDepartaments(new_departament);
    const components = await this.validateEquipment(
      patrimony_code,
      new_departament,
    );
    const transfers: ComponentTransfer[] = components.map(comp => {
      return ComponentTransfer.build({
        component_id: comp.id,
        description,
        new_departament,
        old_departament: comp.departament.id,
      });
    });
    const result = await this.equipmentRepository.equipmentTransfer(
      transfers,
      components,
      new_departament,
    );
    return right(result);
  };
}
