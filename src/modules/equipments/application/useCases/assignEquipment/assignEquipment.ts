import { EquiqmentRepository } from '@modules/equipments/persistence/equipmentRepositoryImpl';
import { IEquipmentRepository } from '@modules/equipments/persistence/equipmentRepository';
import { Either, left, right } from '@shared/core/either';
import { IUseCase } from '@shared/core/useCase';
import { AppError } from '@shared/errors/BaseError';
import { inject, injectable } from 'tsyringe';
import { EquipmentInstance } from '../../../domain/equipment.entity';
import { AssignEquipmentDTO } from './assignEquipment_DTO';
import { EmployeeRepository } from '@modules/employees/persistence/employeeRepositoryImpl';
import { IEmployeeRepository } from '@modules/employees/persistence/employeeRepository';
import { ComponentInstanceRepository } from '@modules/products/persistence/instanceRepositoryImpl';
import { IComponentInstanceRepository } from '@modules/products/persistence/instanceRepository';
import { EquipmentHasComponents } from '@modules/equipments/domain/equipamentHasComponents.entity';
import { Withdrawal } from '@modules/withdrawal/domain/withdrawal.entity';
import { ComponentInstance } from '@modules/products/domain/componentInstance.entity';
@injectable()
export class AssignEquipmentUseCase
  implements
    IUseCase<AssignEquipmentDTO, Promise<Either<AppError, EquipmentInstance>>> {
  constructor(
    @inject(ComponentInstanceRepository)
    private componentRepository: IComponentInstanceRepository,
    @inject(EquiqmentRepository)
    private equipmentRepository: IEquipmentRepository,
    @inject(EmployeeRepository)
    private employeeRepository: IEmployeeRepository,
  ) {}
  private valideteComponent = async (component_sn: string) => {
    const component = await this.componentRepository.bySN(component_sn);
    if (!component) throw new Error(`This component product doesn't exists`);
    if (component.equipment || component.equipments.length) {
      throw new Error(`Component is part or an equipment`);
    }
    return component;
  };
  private validateComponents = async (components: string[] | undefined) => {
    if (!components || components.length < 1) return null;
    const hasComponents = await this.componentRepository.getComponents(
      components,
    );
    if (hasComponents.length !== components.length) {
      throw new Error(`Components doesn't exists.`);
    }
    let compIsPartorEquip: string[] = [];
    for (let component of hasComponents) {
      if (component.equipment) compIsPartorEquip.push(component.id);
      for (let comp of component.equipments) {
        if (comp.component) compIsPartorEquip.push(comp.component.id);
      }
    }
    if (compIsPartorEquip.length > 0) {
      throw new Error(
        `This components is equipments or part of equipments: ${compIsPartorEquip}`,
      );
    }
    return hasComponents;
  };
  private valideDepartComponents = (
    components: ComponentInstance[] | null,
    equipment: EquipmentInstance,
  ) => {
    if (!components) return;
    let invalid_serials: string[] = [];
    for (const comp of components) {
      if (comp.departament.id !== equipment.component.departament.id) {
        invalid_serials.push(comp.serial_number);
      }
    }
    if (invalid_serials) {
      throw new Error(`The components do not belong to the same department`);
    }
  };
  public execute = async ({
    component_sn,
    components,
    matricula,
    patrimony_code,
    by_employee,
    to_employee,
  }: AssignEquipmentDTO): Promise<Either<AppError, EquipmentInstance>> => {
    const hasEquipment = await this.equipmentRepository.byPatrimony(
      patrimony_code,
    );
    if (hasEquipment) throw new Error(`This Equipment already exists`);
    const componentOwner = await this.valideteComponent(component_sn);
    const employee = await this.employeeRepository.byMatricula(matricula);
    if (!employee) throw new Error(`This employee doesn't exists`);
    const hasAllComponents = await this.validateComponents(components);
    const equipDomain = EquipmentInstance.build({
      component: componentOwner,
      employee,
      patrimony_code,
    });
    await this.valideDepartComponents(hasAllComponents, equipDomain);
    if (hasAllComponents && hasAllComponents.length > 0) {
      equipDomain.components.set(
        hasAllComponents.map(component => {
          return EquipmentHasComponents.build(equipDomain, component);
        }),
      );
    }
    const equipment = await this.equipmentRepository.create(equipDomain);
    return right(equipment);
  };
}
