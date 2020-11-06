import {
  Collection,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryKey,
  PrimaryKeyType,
  Property,
  Unique,
} from '@mikro-orm/core';
import { Product } from '@modules/products/domain/product.entity';
import { v4, validate } from 'uuid';
import { Supply } from './supplying.entity';
export interface SuppliedProductsProps {
  product_id: string;
  supply_id: string;
  quantity: number;
}
@Entity({ tableName: 'supplied_products' })
export class SuppliedProducts {
  @Property()
  public product_id: string;
  @Property()
  public supply_id: string;
  @Property()
  public quantity: number;
  @ManyToOne({ entity: () => Product, primary: true, joinColumn: 'product_id' })
  public product: Product;
  @ManyToMany(() => Supply, supply => supply.suppliedProducts)
  public supplies = new Collection<Supply>(this);
  // @ManyToOne({
  //   entity: () => Supplying,
  //   primary: true,
  //   joinColumn: 'supply_id',
  // })
  // public supply: Supplying;
  @Property()
  public createdAt = new Date();
  @Property({ onUpdate: () => new Date() })
  public updatedAt = new Date();
  @Property()
  public deletedAt?: Date;
  [PrimaryKeyType]: [number, number];
  constructor(container:SuppliedProductsProps) {
    this.product_id = container.product_id;
    this.supply_id = container.supply_id;
    this.quantity = container.quantity
  }
  public static build = (
    {supply_id,quantity,product_id}:SuppliedProductsProps
  ): SuppliedProducts => {
    if (!validate(product_id)) throw new Error(`${product_id} Invalid UUID V4`);
    if (!validate(supply_id)) throw new Error(`${supply_id} Invalid UUID V4`);
    return new SuppliedProducts({product_id, supply_id, quantity});
  };
}
