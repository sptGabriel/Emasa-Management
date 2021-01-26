import {
  Entity,
  ManyToOne,
  PrimaryKeyType,
  Property,
} from '@mikro-orm/core';
import { Product } from '@modules/products/domain/product.entity';
import { Supply } from './supplying.entity';
export interface SuppliedProductsProps {
  product: Product;
  supply: Supply;
  quantity: number;
  unit_price:number;
}
@Entity({ tableName: 'supplied_products' })
export class SuppliedProducts {
  @ManyToOne(() => Product,{ primary: true, fieldName:'product_id' })
  public product!: Product;
  @ManyToOne(() => Supply,{ primary: true, fieldName:'supply_id' })
  public supply!: Supply;
  @Property()
  public unit_price: number;
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
    this.unit_price = container.unit_price
  }
  public static build = (
    {supply,quantity,product, unit_price}:SuppliedProductsProps
  ): SuppliedProducts => {
    return new SuppliedProducts({product, supply, quantity, unit_price});
  };
}
