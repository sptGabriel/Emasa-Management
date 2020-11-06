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
  product: Product;
  supply: Supply;
  quantity: number;
}
@Entity({ tableName: 'supplied_products' })
export class SuppliedProducts {
  @ManyToOne(() => Product,{ primary: true, fieldName:'product_id' })
  public product: Product;
  @ManyToOne(() => Supply,{ primary: true, fieldName:'supply_id' })
  public supply: Supply;
  @Property()
  public quantity: number;
  @Property()
  public created_at = new Date();
  @Property({ onUpdate: () => new Date() })
  public updated_at = new Date();
  @Property()
  public deleted_at?: Date;
  [PrimaryKeyType]: [number, number];
  constructor(container:SuppliedProductsProps) {
    this.quantity = container.quantity
    this.product = container.product
    this.supply = container.supply
  }
  public static build = (
    {supply,quantity,product}:SuppliedProductsProps
  ): SuppliedProducts => {
    if (!(supply instanceof Supply)) throw new Error(`Invalid Supply Type`);
    if (!(product instanceof Product)) throw new Error(`Invalid Product Type`);
    return new SuppliedProducts({product, supply, quantity});
  };
}
