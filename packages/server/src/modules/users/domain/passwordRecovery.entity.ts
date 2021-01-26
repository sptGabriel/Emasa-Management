import {
  Entity,
  ManyToOne,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { validate } from 'uuid';
import { User } from './user.entity';

export interface pwdRecoveryContainer {
  user: User;
  token: string;
  used: boolean;
  expires_at: Date;
}

@Entity({ tableName: 'password_recovery' })
export class PasswordRecovery {
  @PrimaryKey()
  public id: Number;
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
  }

  public static build = ({
    expires_at,
    user,
    token,
    used,
  }: pwdRecoveryContainer) => {
    if (!validate(user.employee.id)) throw new Error(`Invalid Employee UUID`);
    return new PasswordRecovery({ user, expires_at, token, used });
  };
}
