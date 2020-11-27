import { Cascade, Entity, OneToOne, Property } from '@mikro-orm/core';
import { Employee } from '@modules/employees/domain/employee.entity';
import { validate } from 'uuid';
import { hash, genSaltSync, compareSync } from 'bcryptjs';
import { isHashedRegex } from '@utils/isHashed';
import { IJWTAcessPayload } from './jwt';
export interface userContainer {
  employee: Employee;
  login: string;
  password: string;
  active?: boolean;
  ref_token?: string | null;
  ip_address: string;
}
@Entity({ tableName: 'users' })
export class User {
  @OneToOne(() => Employee, employee => employee, {
    owner: true,
    primary: true,
    cascade: [Cascade.ALL],
    orphanRemoval: true,
    fieldName: 'id',
  })
  public readonly employee: Employee;
  @Property()
  public login: string;
  @Property()
  public password: string;
  @Property({default:null})
  public ref_token: string | null ; 
  @Property()
  public ip_address: string;
  @Property({ default: false })
  public active: boolean;
  @Property({ name: 'payload', persist:false })
  public get getJWTPayload(): IJWTAcessPayload {
    return {
      id: this.employee.id,
      name: this.employee.getFullName,
      departament_id: this.employee.departament.id,
      login: this.login,
      matricula: this.employee.matricula,
      position: this.employee.position,
    };
  };
  constructor(container: userContainer) {
    this.active = false;
    this.employee = container.employee;
    this.login = container.login;
    this.password = container.password;
    this.ip_address = container.ip_address
    if(container.ref_token) this.ref_token = container.ref_token
    this.ref_token = null;
  }
  public setLogin = (login: string) => {
    if (!(typeof login === 'string')) throw new Error(`Login doesn't string`);
    this.login = login;
  };
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
    active = false,
    ip_address,
    ref_token,
  }: userContainer) => {
    if (!validate(employee.id)) throw new Error(`Invalid Employee UUID`);
    if (employee.user) throw new Error(`Employee already has user`);
    if (password.length == 60 && password.match(isHashedRegex)) {
      throw new Error(`This password has been encrypted`);
    }
    password = await User.EncryptPassword(password);
    return new User({ employee, login, password, active, ip_address, ref_token});
  };
}
