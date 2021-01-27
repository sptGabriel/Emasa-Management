import {
  Entity,
  ManyToOne,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { v4, validate } from 'uuid';
import { User } from './user.entity';

export interface pwdRecoveryContainer {
  id?: string;
  user: User;
  token: string;
  used: boolean;
  expires_at: Date;
}

@Entity({ tableName: 'password_recovery' })
export class PasswordRecovery {
  @PrimaryKey()
  public id: string;
  @ManyToOne({
    entity: () => User,
    fieldName: 'user_id',
  })
  public user: User;
  @Property()
  public token: string;
  @Property()
  public used: boolean;
  @Property()
  public expires_at: Date;

  constructor(container: pwdRecoveryContainer) {
    this.user = container.user;
    this.expires_at = container.expires_at;
    this.token = container.token;
    this.used = container.used;
    this.id = container.id? container.id : v4()
  }

  public static build = ({
    expires_at,
    user,
    token,
    id,
    used,
  }: pwdRecoveryContainer) => {
    if (id && !validate(id)) throw new Error(`Invalid Recovery UUID`);
    if (!validate(user.employee.id)) throw new Error(`Invalid Employee UUID`);
    return new PasswordRecovery({ user, expires_at, token, used, id });
  };
}
