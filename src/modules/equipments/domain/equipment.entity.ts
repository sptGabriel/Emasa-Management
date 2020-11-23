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
import { Component } from '@modules/components/domain/component.entity';
import { Employee } from '@modules/employees/domain/employee.entity';
import { validate } from 'uuid';
import { EquipmentHasComponents } from './equipamentHasComponents.entity';
export interface EquipmentProps {
  id?: string;
  patrimony_code: string;
  employee: Employee;
  component: Component;
}
@Entity({ tableName: 'equipments' })
export class Equipment {
  @PrimaryKey()
  public patrimony_code: string;
  @ManyToOne({ entity: () => Employee, fieldName: 'employee_id' })
  public employee!: Employee;
  @Unique()
  @OneToOne(() => Component, component => component.equipment, {
    owner: true,
    orphanRemoval: true,
    cascade: [],
    fieldName: 'component_id',
  })
  public component: Component;
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
  }: EquipmentProps): Equipment => {
    if (id && !validate(id)) throw new Error(`Invalid UUID V4`);
    return new Equipment({
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
