import {
  Collection,
  Entity,
  LoadStrategy,
  OneToMany,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { v4, validate } from 'uuid';
import { WithdrawalComponents } from './withdrawalComponents.entity';
interface withdrawalContainer {
  id?: string;
  by_employee: string;
  to_employee: string;
  to_departament: string;
}
@Entity({ tableName: 'withdrawal' })
export class Withdrawal {
  @PrimaryKey()
  public readonly id: string;
  @Property()
  public by_employee: string;
  @Property()
  public to_employee: string;
  @Property()
  public to_departament: string;
  @OneToMany(() => WithdrawalComponents, Withdrawal => Withdrawal.withdrawal, {
    strategy: LoadStrategy.JOINED,
  })
  public components = new Collection<WithdrawalComponents>(this);
  @Property()
  public created_at = new Date();
  @Property({ onUpdate: () => new Date() })
  public updated_at = new Date();
  @Property()
  public deleted_at?: Date;

  constructor(container: withdrawalContainer) {
    this.id = container.id ? container.id : v4();
    this.by_employee = container.by_employee;
    this.to_employee = container.to_employee;
    this.to_departament = container.to_departament;
  }

  static build = ({
    id,
    by_employee,
    to_employee,
    to_departament,
  }: withdrawalContainer): Withdrawal => {
    const isValidUUID = id ? validate(id) : null;
    if (isValidUUID === false) throw new Error(`Invalid UUID V4`);
    return new Withdrawal({ id, by_employee, to_employee, to_departament });
  };

  // toJSON = () => {
  //   return {
  //     id: this.id,
  //     name: this.name,
  //     parent_id: this.parent ? this.parent.id : null,
  //     created_at: this.created_at,
  //     updated_at: this.updated_at,
  //     deleted_at: this.deleted_at,
  //   };
  // };
}
