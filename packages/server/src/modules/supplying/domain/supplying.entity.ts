import {
  Collection,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { Contract } from '@modules/contracts/domain/contract.entity';
import { ProductStocks } from '@modules/products/domain/stock.entity';
import { v4, validate } from 'uuid';
import { SuppliedProducts } from './suppliedProducts.entity';
export interface SupplyProps {
  id?: string;
  supplier_id: string;
  total_amount:number;
  arrived: boolean;
  ordered_at: Date;
  arrives_at: Date;
  deleted_at?: Date;
}
interface suppliedProducts {
  product_id: string;
  quantity: number;
  unit_price:number;
}
export interface toResponse {
  id: string;
  supplier_id: string;
  contract_id: string;
  total_amount:number;
  arrived: boolean;
  arrives_at: Date;
  ordered_at: Date;
  created_at: Date;
  updated_at: Date;
}
@Entity({ tableName: 'supplies' })
export class Supply {
  @PrimaryKey()
  public readonly id: string;
  @Property()
  public supplier_id: string;
  @Property()
  public total_amount: number;
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
  @OneToOne(() => Contract, contract => contract.supply, {
    owner: true,
    orphanRemoval: true,
  })
  public contract: Contract;
  @OneToOne({entity: () => ProductStocks, mappedBy: 'supply' })
  public product_stock!: ProductStocks;
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
    this.total_amount = container.total_amount
  }
  static build = (props: SupplyProps, contract: Contract): Supply => {
    if (props.id && !validate(props.id))
      throw new Error(`Invalid UUID: ${props.id}`);
    if (!validate(props.supplier_id))
      throw new Error(`Invalid UUID:${props.supplier_id}`);
    return new Supply(props, contract);
  };

  // toJson = (): toResponse => {
  //   return {
  //     id: this.id,
  //     supplier_id:this.supplier_id,
  //     contract_id:this.contract.id,
  //     arrived: this.arrived,
  //     arrives_at: this.arrives_at,
  //     ordered_at:this.ordered_at,
  //     created_at: this.created_at,
  //     updated_at: this.updated_at,
  //   }
  // };
}
