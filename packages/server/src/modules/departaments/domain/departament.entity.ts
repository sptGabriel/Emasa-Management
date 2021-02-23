import {
  Cascade,
  Collection,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryKey,
  Property,
  Unique,
} from '@mikro-orm/core';
import { Employee, Positions } from '@modules/employees/domain/employee.entity';
import { enumFromValue } from '@utils/enumFromValue';
import { isString } from '@utils/isString';
import { v4, validate } from 'uuid';
import { DepartamentRequests } from './requests.entity';

interface DepartamentContainer {
  id?: string;
  departament_name: string;
  initial_acronyms: string;
  employees?: Employee[];
}

@Entity({ tableName: 'departaments' })
export class Departament {
  @PrimaryKey()
  public readonly id: string;
  @Property()
  @Unique({ name: 'name' })
  public departament_name: string;
  @Property()
  @Unique({ name: 'initial_acronyms' })
  public initial_acronyms: string;
  @OneToMany(() => Employee, employee => employee.departament)
  public employees = new Collection<Employee>(this);
  @Property({ default: true })
  public status: boolean;
  @OneToOne({
    entity: () => DepartamentRequests,
    mappedBy: 'departament',
    cascade: [Cascade.PERSIST],
  })
  public request: DepartamentRequests;
  @Property()
  public createdAt = new Date();
  @Property({ onUpdate: () => new Date() })
  public updatedAt = new Date();
  @Property()
  public deletedAt?: Date;

  @Property({ name: 'devicesInformations', persist: false })
  public get formatedReponse(): any {
    const gerente = this.employees
      .getItems()
      .find(i => i.position === Positions.gerente);
    const coordenador = this.employees
      .getItems()
      .find(i => i.position === Positions.coordenador);
    const diretor = this.employees
      .getItems()
      .find(i => i.position === Positions.diretor);
    return {
      id: this.id,
      nome: this.departament_name,
      sigla: this.initial_acronyms,
      diretor: diretor ? diretor.formatedEmployee : null,
      coordenador: coordenador ? coordenador.formatedEmployee : null,
      gerente: gerente ? gerente.formatedEmployee : null,
      status: this.status,
      criado: this.createdAt,
      employees: this.employees
        .getItems()
        .map(employee => employee.formatedEmployee),
    };
  }

  constructor({
    departament_name,
    employees,
    initial_acronyms,
    id,
  }: DepartamentContainer) {
    if (!id) this.id = v4();
    this.departament_name = departament_name;
    this.initial_acronyms = initial_acronyms;
    if (employees) this.employees.set(employees);
  }
  static build = ({
    id,
    initial_acronyms,
    departament_name,
    employees,
  }: DepartamentContainer): Departament => {
    const isValidUUID = id ? validate(id) : null;
    if (isValidUUID === false) throw new Error(`Invalid UUID V4`);
    if (!isString(departament_name))
      throw new Error(`name expect a string type`);
    return new Departament({
      departament_name,
      id,
      employees,
      initial_acronyms,
    });
  };
}
