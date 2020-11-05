import { Entity, PrimaryKey, Property, Unique } from '@mikro-orm/core';
import { v4, validate } from 'uuid';
@Entity({ tableName: 'supplying' })
export class Supplying {
  @PrimaryKey()
  public readonly id: string;
  @Property()
  public supplier_id: string;
  @Property()
  public arrived: boolean;
  @Property()
  public orderedAt: Date;
  @Property()
  public arrivesAt: Date;
  @Property()
  public createdAt = new Date();
  @Property({ onUpdate: () => new Date() })
  public updatedAt = new Date();
  @Property()
  public deletedAt?: Date;
  constructor(
    props: Omit<Supplying, 'id' | 'updatedAt' | 'createdAt'>,
    id?: string,
  ) {
    Object.assign(this, props);
    if (!id) this.id = v4();
  }
  static build = (
    props: Omit<Supplying, 'id' | 'updatedAt' | 'createdAt'>,
    id?: string,
  ): Supplying => {
    const isValidUUID = id ? validate(id) : null;
    if (isValidUUID === false) throw new Error(`Invalid UUID V4`);
    return new Supplying(props, id);
  };
}
