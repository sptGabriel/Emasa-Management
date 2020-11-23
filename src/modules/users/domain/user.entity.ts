import { Cascade, Entity, OneToOne, Property } from "@mikro-orm/core";
import { Employee } from "@modules/employees/domain/employee.entity";
export interface userContainer {
  id:Employee;
  login:string;
  password:string;
  active:boolean;
}
@Entity({tableName: 'users'})
export class User {
  @OneToOne(() => Employee, employee => employee, {
    owner: true,
    primary:true,
    cascade: [Cascade.ALL],
    orphanRemoval: true,
    fieldName: 'id',
  })
  public readonly employee: Employee;
  @Property()
  public login:string;
  @Property()
  public password:string;
  @Property({default:false})
  public active:boolean;
  constructor(){

  }
}