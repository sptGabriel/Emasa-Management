import { Entity, ManyToOne, PrimaryKey, PrimaryKeyType, Property, Unique } from '@mikro-orm/core';
import { Product } from '@modules/products/domain/product.entity';
import { v4, validate } from 'uuid';
import { Supplying } from './supplying.entity';
@Entity({ tableName: 'supplied_products ' })
export class SuppliedProducts {
  @Property()
  public product_id: string;
  @Property()
  public supply_id: string;
  @ManyToOne({ entity: () => Product, primary: true, joinColumn: 'product_id' })
  public product: Product;
  @ManyToOne({ entity: () => Supplying, primary: true, joinColumn: 'supply_id' })
  public supply: Supplying;
  @Property()
  public createdAt = new Date();
  @Property({ onUpdate: () => new Date() })
  public updatedAt = new Date();
  @Property()
  public deletedAt?: Date;
  [PrimaryKeyType]: [number, number];
  constructor(
    props: Omit<SuppliedProducts,  | 'updatedAt' | 'createdAt' | 'deletedAt' >,
  ) {
    Object.assign(this, props);
  }
  static build = (
    props: Omit<SuppliedProducts, 'deletedAt' | 'updatedAt' | 'createdAt'>,
  ): SuppliedProducts => {
    const productIDisUUID = props.product_id ? validate(props.product_id) : null;
    if (productIDisUUID === false) throw new Error(`Invalid UUID V4`);
    const supplyIDisUUID = props.supply_id ? validate(props.supply_id) : null;
    if (supplyIDisUUID === false) throw new Error(`Invalid UUID V4`);
    return new SuppliedProducts(props);
  };
}
