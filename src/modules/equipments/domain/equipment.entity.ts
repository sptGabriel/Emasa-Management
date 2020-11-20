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
import { validate } from 'uuid';
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
  @OneToOne(() => ComponentInstance, component => component.equipment, {
    owner: true,
    orphanRemoval: true,
    cascade: [],
    fieldName: 'component_id',
  })
  public component: ComponentInstance;
  @OneToMany(() => EquipmentHasComponents, equips => equips.equipment)
  public components = new Collection<EquipmentHasComponents>(this);
  @Property()
  public created_at = new Date();
  @Property({ onUpdate: () => new Date() })
  public updated_at = new Date();
  @Property()
  public deleted_at?: Date;

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

  toJSON = () => {
    return{
      patrimony_code: this.patrimony_code,
      component_owner: this.component.id,
      employee_id: this.employee.id,
      departament_id: this.component.departament?.id,
      components: this.components.getItems().map((item) => item.component.serial_number),
      created_at:this.created_at,
      updated_at:this.updated_at
    }
  }
}
