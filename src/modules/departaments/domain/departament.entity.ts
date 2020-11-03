import { Entity, PrimaryKey, Property, Unique } from '@mikro-orm/core';
import { isString } from '@utils/isString';
import { v4,validate } from 'uuid';
@Entity({ tableName: 'departaments' })
export class Departament {
  @PrimaryKey()
  public readonly id: string;
  @Property()
  @Unique({ name: 'name' })
  public departament_name: string;
  @Property()
  public createdAt = new Date();
  @Property({ onUpdate: () => new Date() })
  public updatedAt = new Date();
  @Property()
  public deletedAt?: Date;
  constructor(departament_name: string, id?: string) {
    if (!id) this.id = v4();
    this.departament_name = departament_name;
  }
  static build = (departament_name: string, id?: string): Departament => {
    const isValidUUID = id ? validate(id) : null;
    if (isValidUUID === false) throw new Error(`Invalid UUID V4`);
    if (!isString(departament_name))
      throw new Error(`name expect a string type`);
    return new Departament(departament_name, id);
  };
}
