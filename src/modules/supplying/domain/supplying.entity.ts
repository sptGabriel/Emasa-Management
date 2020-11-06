import {
  Collection,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryKey,
  Property,
  Unique,
} from '@mikro-orm/core';
import { Cascade } from '@mikro-orm/core/enums';
import { Contract } from '@modules/contracts/domain/contract.entity';
import { v4, validate } from 'uuid';
import { SuppliedProducts } from './suppliedProducts.entity';
export interface SupplyProps {
  id?: string;
  supplier_id: string;
  arrived: boolean;
  ordered_at: Date;
  arrives_at: Date;
  deleted_at?: Date;
}
@Entity({ tableName: 'supplies' })
export class Supply {
  @PrimaryKey()
  public readonly id: string;
  @Property()
  public supplier_id: string;
  @Property()
  public arrived: boolean;
  @Property()
  public ordered_at: Date;
  @Property()
  public arrives_at: Date;
  @Property()
  public created_at = new Date();
  @Property({ onUpdate: () => new Date() })
  public updated_at = new Date();
  @Property()
  public deleted_at?: Date;
  @ManyToOne(() => Contract, { fieldName: 'contract_id' })
  public contract: Contract;
  @OneToMany(() => SuppliedProducts, supplied => supplied.supply)
  public suppliedProducts = new Collection<SuppliedProducts>(this);
  constructor(container: SupplyProps, contract: Contract) {
    this.id = container.id ? container.id : v4();
    this.deleted_at = container.deleted_at;
    this.arrives_at = container.arrives_at;
    this.arrived = container.arrived;
    this.ordered_at = container.ordered_at;
    this.supplier_id = container.supplier_id;
    this.contract = contract;
  }
  static build = (props: SupplyProps, contract: Contract): Supply => {
    if (props.id && !validate(props.id))
      throw new Error(`Invalid UUID: ${props.id}`);
    if (!validate(props.supplier_id))
      throw new Error(`Invalid UUID:${props.supplier_id}`);
    return new Supply(props, contract);
  };
}
