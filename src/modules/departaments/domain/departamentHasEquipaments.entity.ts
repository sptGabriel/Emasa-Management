import {
  Collection,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryKey,
  PrimaryKeyType,
  Property,
} from '@mikro-orm/core';
import { ComponentInstance } from '@modules/products/domain/componentInstance.entity';
import { Departament } from './departament.entity';

@Entity({ tableName: 'departament_has_components' })
export class DepartamentHasComponents {
  @PrimaryKey()
  public readonly id: string;
  @ManyToOne({
    entity: () => ComponentInstance,
    fieldName: 'component_id',
    primary: true,
  })
  public component!: ComponentInstance;
  @ManyToOne({
    entity: () => Departament,
    fieldName: 'departament_id',
    primary: true,
  })
  public departament!: Departament;
  [PrimaryKeyType]: [Departament, ComponentInstance];
  @Property()
  public createdAt = new Date();
  @Property({ onUpdate: () => new Date() })
  public updatedAt = new Date();
  @Property()
  public deletedAt?: Date;
  constructor(departament: Departament, instance: ComponentInstance) {
    this.departament = departament;
    this.component = instance;
  }
  static build = (
    departament: Departament,
    instance: ComponentInstance,
  ): DepartamentHasComponents => {
    return new DepartamentHasComponents(departament, instance);
  };
}
