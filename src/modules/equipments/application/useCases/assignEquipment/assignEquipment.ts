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
    private valideteComponent = async (component_sn:string) => {
      const component = await this.componentRepository.bySN(component_sn);
      if (!component) throw new Error(`This component product doesn't exists`);
      const ComponentisPartEquipment = await this.equipmentRepository.bySN(component_sn)
      if(ComponentisPartEquipment){
        throw new Error(`The component is already part of an equipment`);
      }
      return component

    }
    private validateComponents = async (components: string[] | undefined) => {
      if (!components || components.length < 1) return null;
      const hasComponents = await this.componentRepository.byArray(components);
      console.log(hasComponents)
      if (hasComponents.length !== components.length)
        throw new Error('tratar error.');
      return hasComponents;
    };
    public execute = async ({
      component_sn,
      components,
      matricula,
      patrimony_code,
    }: AssignEquipmentDTO): Promise<Either<AppError, EquipmentInstance>> => {
      const hasEquipment = await this.equipmentRepository.byPatrimony(
        patrimony_code,
      );
      if (hasEquipment) throw new Error(`This Equipment already exists`);
      const employee = await this.employeeRepository.byMatricula(matricula);
      if (!employee) throw new Error(`This employee doesn't exists`);
      const product = await this.valideteComponent(component_sn)
      if (!product) throw new Error(`This component product doesn't exists`);
      const hasAllComponents = await this.validateComponents(components);
      const equipDomain = EquipmentInstance.build({
        component: product,
        employee,
        patrimony_code,
      });
      // if (hasAllComponents && hasAllComponents.length > 0) {
      //   equipDomain.components.set(hasAllComponents.map(component => {
      //     return EquipmentHasComponents.build(equipDomain, component);
      //   }))
      // }
      const equipment = await this.equipmentRepository.create(equipDomain);
      return right(equipment);
    };
  }
