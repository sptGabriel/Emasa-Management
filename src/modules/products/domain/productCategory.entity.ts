import { Entity, PrimaryKey, Property, Unique } from '@mikro-orm/core';
import { v4, validate } from 'uuid';
@Entity({ tableName: 'product_categories' })
export class ProductCategory {
  @PrimaryKey()
  public readonly id: string;
  @Property()
  public parent_id: string;
  @Property()
  public name: string;
  @Property()
  public createdAt = new Date();
  @Property({ onUpdate: () => new Date() })
  public updatedAt = new Date();
  @Property()
  public deletedAt?: Date;
  constructor(
    props: Omit<ProductCategory, 'id' | 'updatedAt' | 'createdAt'>,
    id?: string,
  ) {
    Object.assign(this, props);
    if (!id) this.id = v4();
  }
  static build = (
    props: Omit<ProductCategory, 'id' | 'updatedAt' | 'createdAt'>,
    id?: string,
  ): ProductCategory => {
    const isValidUUID = id ? validate(id) : null;
    if (isValidUUID === false) throw new Error(`Invalid UUID V4`);
    return new ProductCategory(props, id);
  };
}
