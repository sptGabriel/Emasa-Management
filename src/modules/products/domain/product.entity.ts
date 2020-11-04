import { Entity, PrimaryKey, Property, Unique } from '@mikro-orm/core';
import { v4, validate } from 'uuid';
@Entity({ tableName: 'suppliers' })
export class Supplier {
  @PrimaryKey()
  public readonly id: string;
  @Property()
  public cnpj: string;
  @Property()
  public supplier_name: string;
  @Property()
  public supplier_email: string;
  @Property()
  public description: string;
  @Property()
  public createdAt = new Date();
  @Property({ onUpdate: () => new Date() })
  public updatedAt = new Date();
  @Property()
  public deletedAt?: Date;
  constructor(
    props: Omit<Supplier, 'id' | 'updatedAt' | 'createdAt'>,
    id?: string,
  ) {
    Object.assign(this, props);
    if (!id) this.id = v4();
  }
  static build = (
    props: Omit<Supplier, 'id' | 'updatedAt' | 'createdAt'>,
    id?: string,
  ): Supplier => {
    const isValidUUID = id ? validate(id) : null;
    if (isValidUUID === false) throw new Error(`Invalid UUID V4`);
    return new Supplier(props, id);
  };
}
