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
import { wrap } from '@mikro-orm/core';
@injectable()
export class ComponentTransferUseCase
  implements
    IUseCase<transferDTO, Promise<Either<AppError, ComponentTransfer>>> {
  constructor(
    @inject(DepartamentRepository)
    private departamentRepository: IDepartamentRepository,
    @inject(ComponentRepository)
    private componentRepository: IComponentRepository,
  ) {}
  private validateDepartament = async (id: string) => {
    const departament = await this.departamentRepository.byId(id);
    if(!departament)throw new Error(`This departament doesn't exists`);
    return departament
  };
  private validateComponent = async(sn:string,departament:string) => {
    const component = await this.componentRepository.bySN(sn);
    if (!component) throw new Error(`This component doesn't exists`);
    if(component.departament.id === departament){
      throw new Error(`This equipment already belongs to that department`)
    }
    if (component.equipment || component.equipments.length > 0) {
      throw new Error(`This Component is a Equipment part or a equipment.`);
    }
    return component
  }
  public execute = async ({
    serial_number,
    description,
    new_departament,
  }: transferDTO): Promise<Either<AppError, ComponentTransfer>> => {
    if (!description) throw new Error(`Invalid Description`);
    const hasDepartament = await this.validateDepartament(new_departament);
    const component = await this.validateComponent(serial_number,new_departament);
    wrap(component).assign({departament:hasDepartament})
    const componentTransfer = await this.componentRepository.componentTransfer(
      ComponentTransfer.build({
        component_id: component.id,
        old_departament:component.departament.id,
        new_departament,
        description,
      }),
      component
    );
    return right(componentTransfer);
  };
}
