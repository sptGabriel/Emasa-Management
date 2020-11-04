import { Entity, Enum, PrimaryKey, Property, Unique } from '@mikro-orm/core';
import { isString } from '@utils/isString';
import { v4, validate } from 'uuid';
export enum Positions {
  diretor = 'diretor',
  gerente = 'gerente',
  tecnico = 'tecnico',
}
@Entity({ tableName: 'employees' })
@Unique({ properties: ['position', 'departament_id'] })
export class Employee {
  @PrimaryKey()
  public readonly id: string;
  @Property()
  public matricula: string;
  @Property()
  public first_name: string;
  @Property()
  public last_name: string;
  @Property()
  public departament_id: string;
  @Enum()
  public position: Positions;
  @Property()
  public createdAt = new Date();
  @Property({ onUpdate: () => new Date() })
  public updatedAt = new Date();
  @Property()
  public deletedAt?: Date;
  constructor(
    props: Omit<Employee, 'id' | 'updatedAt' | 'createdAt'>,
    id?: string,
  ) {
    Object.assign(this, props);
    if (!id) this.id = v4();
  }
  static build = (
    props: Omit<Employee, 'id' | 'updatedAt' | 'createdAt'>,
    id?: string,
  ): Employee => {
    const isValidUUID = id ? validate(id) : null;
    if (isValidUUID === false) throw new Error(`Invalid UUID V4`);
    return new Employee(props, id);
  };
}
