import {
  Entity,
  ManyToOne,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { Employee } from '@modules/employees/domain/employee.entity';
import { validate } from 'uuid';

export interface pwdRecoveryContainer {
  employee: Employee;
  token: string;
  used: boolean;
  expires_at: Date;
}

@Entity({ tableName: 'password_recovery' })
export class PasswordRecovery {
  @PrimaryKey()
  public id: Number;
  @ManyToOne({
    entity: () => Employee,
    fieldName: 'employee_id',
  })
  public employee: Employee;
  @Property()
  public token: string;
  @Property()
  public used: boolean;
  @Property()
  public expires_at: Date;

  constructor(container: pwdRecoveryContainer) {
    this.employee = container.employee;
    this.expires_at = container.expires_at;
    this.token = container.token;
    this.used = container.used;
  }

  public static build = ({
    expires_at,
    employee,
    token,
    used,
  }: pwdRecoveryContainer) => {
    if (!validate(employee.id)) throw new Error(`Invalid Employee UUID`);
    return new PasswordRecovery({ employee, expires_at, token, used });
  };
}
