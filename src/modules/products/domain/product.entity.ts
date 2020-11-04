import { Entity, PrimaryKey, Property } from '@mikro-orm/core';
import { v4, validate } from 'uuid';
@Entity({ tableName: 'products' })
export class Product {
  @PrimaryKey()
  public readonly id: string;
  @Property()
  public name: string;
  @Property()
  public codReference: string;
  @Property()
  public category_id: string;
  @Property()
  public createdAt = new Date();
  @Property({ onUpdate: () => new Date() })
  public updatedAt = new Date();
  @Property()
  public deletedAt?: Date;
  constructor(
    props: Omit<Product, 'id' | 'updatedAt' | 'createdAt'>,
    id?: string,
  ) {
    Object.assign(this, props);
    if (!id) this.id = v4();
  }
  static build = (
    props: Omit<Product, 'id' | 'updatedAt' | 'createdAt'>,
    id?: string,
  ): Product => {
    const isValidUUID = id ? validate(id) : null;
    if (isValidUUID === false) throw new Error(`Invalid UUID V4`);
    return new Product(props, id);
  };
}
