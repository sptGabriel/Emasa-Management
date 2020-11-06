import { Entity, PrimaryKey, Property } from '@mikro-orm/core';
import { v4, validate } from 'uuid';
@Entity({ tableName: 'products' })
export class Product {
  @PrimaryKey()
  public readonly id: string;
  @Property()
  public name: string;
  @Property()
  public cod_reference: string;
  @Property()
  public category_id: string;
  @Property()
  public created_at = new Date();
  @Property({ onUpdate: () => new Date() })
  public updated_at = new Date();
  @Property()
  public deleted_at?: Date;
  constructor(
    props: Omit<Product, 'id' | 'updated_at' | 'created_at'>,
    id?: string,
  ) {
    Object.assign(this, props);
    if (!id) this.id = v4();
  }
  static build = (
    props: Omit<Product, 'id' | 'updated_at' | 'created_at'>,
    id?: string,
  ): Product => {
    const isValidUUID = id ? validate(id) : null;
    if (isValidUUID === false) throw new Error(`Invalid UUID V4`);
    return new Product(props, id);
  };
}
