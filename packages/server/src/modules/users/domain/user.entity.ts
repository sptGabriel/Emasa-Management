import {
  Cascade,
  Collection,
  Entity,
  LoadStrategy,
  OneToMany,
  OneToOne,
  Property,
} from '@mikro-orm/core';
import { Employee } from '@modules/employees/domain/employee.entity';
import { validate } from 'uuid';
import { hash, genSaltSync, compareSync } from 'bcryptjs';
import { isHashedRegex } from '@utils/isHashed';
import { IJWTAcessPayload } from './jwt';
export interface userContainer {
  employee: Employee;
  login: string;
  password: string;
  ref_token?: string | null;
}
@Entity({ tableName: 'users' })
export class User {
  @OneToOne(() => Employee, employee => employee, {
    owner: true,
    primary: true,
    cascade: [Cascade.PERSIST],
    orphanRemoval: true,
    fieldName: 'employee_id',
  })
  public readonly employee: Employee;
  @Property()
  public login: string;
  @Property()
  public password: string;
  @Property({ default: null })
  public ref_token: string | null;
  @Property({ name: 'payload', persist: false })
  public get getJWTPayload(): IJWTAcessPayload {
    return {
      id: this.employee.id,
      name: this.employee.getFullName,
      departament_id: this.employee.departament.id,
      login: this.login,
      matricula: this.employee.matricula,
      position: this.employee.position,
    };
  }
  constructor(container: userContainer) {
    this.employee = container.employee;
    this.login = container.login;
    this.password = container.password;
    if (container.ref_token) this.ref_token = container.ref_token;
    this.ref_token = null;
  }
  public static DecryptPassword = (plain_pass: string, old_pass: string) => {
    return compareSync(plain_pass, old_pass);
  };
  public static EncryptPassword = async (password: string) => {
    return await hash(password, genSaltSync(10)).catch(err => {
      throw err;
    });
  };
  public static build = async ({
    employee,
    login,
    password,
    ref_token,
  }: userContainer) => {
    if (!validate(employee.id)) throw new Error(`Invalid Employee UUID`);
    if (employee.user) throw new Error(`Employee already has user`);
    if (password.length == 60 && password.match(isHashedRegex)) {
      throw new Error(`This password has been encrypted`);
    }
    password = await User.EncryptPassword(password)
    return new User({ employee, login, password, ref_token });
  };
}
