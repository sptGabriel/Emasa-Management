import {
  Entity,
  LoadStrategy,
  ManyToOne,
  PrimaryKeyType,
  Property,
} from '@mikro-orm/core';
import { ComponentInstance } from '@modules/products/domain/componentInstance.entity';
import { Withdrawal } from './withdrawal.entity';

@Entity({ tableName: 'withdrawal_components' })
export class WithdrawalComponents {
  @ManyToOne({
    entity: () => Withdrawal,
    fieldName: 'withdrawal_id',
    primary: true,
    strategy: LoadStrategy.JOINED,
  })
  public withdrawal!: Withdrawal;
  @ManyToOne({
    entity: () => ComponentInstance,
    fieldName: 'component_id',
    primary: true,
    strategy: LoadStrategy.JOINED,
  })
  public component!: ComponentInstance;
  [PrimaryKeyType]: [ComponentInstance , Withdrawal];
  @Property()
  public createdAt = new Date();
  @Property({ onUpdate: () => new Date() })
  public updatedAt = new Date();
  @Property()
  public deletedAt?: Date;
  constructor(withdrawal: Withdrawal, component: ComponentInstance) {
    this.withdrawal = withdrawal;
    this.component = component;
  }
  static build = (
    withdrawal: Withdrawal,
    component: ComponentInstance,
  ): WithdrawalComponents => {
    return new WithdrawalComponents(withdrawal, component);
  };
}
