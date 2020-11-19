import {
  Collection,
  Entity,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryKey,
  Property,
  Unique,
} from '@mikro-orm/core';
import { Employee } from '@modules/employees/domain/employee.entity';
import { ComponentInstance } from '@modules/products/domain/componentInstance.entity';
import { v4, validate } from 'uuid';
import { EquipmentHasComponents } from './equipamentHasComponents.entity';
export interface EquipmentProps {
  id?: string;
  patrimony_code: string;
  employee: Employee;
  component: ComponentInstance;
}
@Entity({ tableName: 'equipments' })
export class EquipmentInstance {
  @PrimaryKey()
  public patrimony_code: string;
  @ManyToOne({ entity: () => Employee, fieldName: 'employee_id' })
  public employee!: Employee;
  @Unique()
  @OneToOne(() => ComponentInstance, component => component.equipament, {
    owner: true,
    orphanRemoval: true,
    cascade: [],
    fieldName: 'component_id',
  })
  public component: ComponentInstance;
  @OneToMany(() => EquipmentHasComponents, equips => equips.equipment)
  public components = new Collection<EquipmentHasComponents>(this);
  @Property()
  public createdAt = new Date();
  @Property({ onUpdate: () => new Date() })
  public updatedAt = new Date();
  @Property()
  public deletedAt?: Date;

  constructor(container: EquipmentProps) {
    this.patrimony_code = container.patrimony_code;
    this.employee = container.employee;
    this.component = container.component;
  }

  static build = ({
    id,
    employee,
    patrimony_code,
    component,
  }: EquipmentProps): EquipmentInstance => {
    if (id && !validate(id)) throw new Error(`Invalid UUID V4`);
    return new EquipmentInstance({
      id,
      employee,
      patrimony_code,
      component,
    });
  };
}
