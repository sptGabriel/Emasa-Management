import {
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { Departament } from '@modules/departaments/domain/departament.entity';
import { Employee } from '@modules/employees/domain/employee.entity';
import { ComponentInstance } from '@modules/products/domain/componentInstance.entity';
import { v4, validate } from 'uuid';
export interface EquipmentProps {
  id?: string;
  patrimony_code: string;
  employee: Employee;
  departament: Departament;
  component: ComponentInstance;
}
@Entity({ tableName: 'equipments_instances' })
export class EquipmentInstance {
  @PrimaryKey()
  public readonly id: string;
  @Property()
  public patrimony_code: string;
  @ManyToOne({ entity: () => Employee, fieldName: 'employee_id' })
  public employee!: Employee;
  @ManyToOne({ entity: () => Departament, fieldName: 'departament_id' })
  public departament!: Departament;
  @OneToOne(() => ComponentInstance, component => component.equipament, {
    inversedBy: 'equipament',
    orphanRemoval: true,
    fieldName: 'component_id',
  })
  public component: ComponentInstance;
  @Property()
  public createdAt = new Date();
  @Property({ onUpdate: () => new Date() })
  public updatedAt = new Date();
  @Property()
  public deletedAt?: Date;

  constructor(container: EquipmentProps) {
    this.id = container.id ? container.id : v4();
    this.patrimony_code = container.patrimony_code;
    this.departament = container.departament;
    this.employee = container.employee;
    this.component = container.component;
  }

  static build = ({
    id,
    departament,
    employee,
    patrimony_code,
    component,
  }: EquipmentProps): EquipmentInstance => {
    if (id && !validate(id)) throw new Error(`Invalid UUID V4`);
    return new EquipmentInstance({
      departament,
      id,
      employee,
      patrimony_code,
      component,
    });
  };
}
