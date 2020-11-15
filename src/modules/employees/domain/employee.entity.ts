import { Entity, Enum, ManyToOne, PrimaryKey, Property, Unique } from '@mikro-orm/core';
import { Departament } from '@modules/departaments/domain/departament.entity';
import { v4, validate } from 'uuid';
export interface EmployeeContainer {
  id?:string;
  matricula:string;
  departament:Departament;
  first_name: string;
  last_name: string;
  position: Positions;
}
export enum Positions {
  diretor = 'diretor',
  gerente = 'gerente',
  tecnico = 'tecnico',
}
@Entity({ tableName: 'employees' })
@Unique({ properties: ['position', 'departament'] })
export class Employee {
  @PrimaryKey()
  public readonly id: string;
  @Property()
  public matricula: string;
  @Property()
  public first_name: string;
  @Property()
  public last_name: string;
  @Enum()
  public position: Positions;
  @ManyToOne({ entity: () => Departament, name: 'departament_id' })
  public departament: Departament
  @Property()
  public createdAt = new Date();
  @Property({ onUpdate: () => new Date() })
  public updatedAt = new Date();
  @Property()
  public deletedAt?: Date;
  constructor(container: EmployeeContainer) {
    this.id = container.id ? container.id : v4();
    this.matricula = container.matricula;
    this.first_name = container.first_name;
    this.last_name = container.last_name;
    this.departament = container.departament;
    this.position = container.position;
  }
  static build = (
    {id,matricula,departament,first_name,last_name,position}: EmployeeContainer,
  ): Employee => {
    const isValidUUID = id ? validate(id) : null;
    if (isValidUUID === false) throw new Error(`Invalid UUID V4`);
    return new Employee({id,position,last_name,first_name,departament,matricula});
  };
}
