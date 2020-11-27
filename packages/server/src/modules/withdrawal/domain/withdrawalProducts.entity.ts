import {
  Entity,
  LoadStrategy,
  ManyToOne,
  PrimaryKeyType,
  Property,
} from '@mikro-orm/core';
import { Component} from '@modules/components/domain/component.entity';
import { Withdrawal } from './withdrawal.entity';

@Entity({ tableName: 'withdrawal_components' })
export class WithdrawalProduct {
  @ManyToOne({
    entity: () => Withdrawal,
    fieldName: 'withdrawal_id',
    primary: true,
    strategy: LoadStrategy.JOINED,
  })
  public withdrawal!: Withdrawal;
  @ManyToOne({
    entity: () => Component,
    fieldName: 'component_id',
    primary: true,
    strategy: LoadStrategy.JOINED,
  })
  public component!: Component;
  [PrimaryKeyType]: [Component , Withdrawal];
  @Property()
  public createdAt = new Date();
  @Property({ onUpdate: () => new Date() })
  public updatedAt = new Date();
  @Property()
  public deletedAt?: Date;
  constructor(withdrawal: Withdrawal, component: Component) {
    this.withdrawal = withdrawal;
    this.component = component;
  }
  static build = (
    withdrawal: Withdrawal,
    component: Component,
  ): WithdrawalProduct => {
    return new WithdrawalProduct(withdrawal, component);
  };
}
