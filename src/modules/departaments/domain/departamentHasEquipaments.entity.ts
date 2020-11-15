import {
  Collection,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryKey,
  PrimaryKeyType,
  Property,
} from '@mikro-orm/core';
import { ProductInstance } from '@modules/products/domain/productInstance.entity';
import { Departament } from './departament.entity';

@Entity({ tableName: 'departament_has_equipaments' })
export class DepartamentHasEquipaments {
  @PrimaryKey()
  public readonly id: string;
  @ManyToOne({
    entity: () => ProductInstance,
    fieldName: 'equipament_id',
    primary: true,
  })
  public equipament!: ProductInstance;
  @ManyToOne({
    entity: () => Departament,
    fieldName: 'departament_id',
    primary: true,
  })
  public departament!: Departament;
  [PrimaryKeyType]: [Departament, ProductInstance];
  @Property()
  public createdAt = new Date();
  @Property({ onUpdate: () => new Date() })
  public updatedAt = new Date();
  @Property()
  public deletedAt?: Date;
  constructor(departament: Departament, instance: ProductInstance) {
    this.departament = departament;
    this.equipament = instance
  }
  static build = (departament: Departament, instance: ProductInstance): DepartamentHasEquipaments => {
    return new DepartamentHasEquipaments(departament, instance);
  };
}
