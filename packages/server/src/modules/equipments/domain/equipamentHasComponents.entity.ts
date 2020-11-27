import {
  Collection,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryKey,
  PrimaryKeyType,
  Property,
} from '@mikro-orm/core';
import { Component } from '@modules/components/domain/component.entity';
import { Equipment } from './equipment.entity';

@Entity({ tableName: 'equipment_has_components' })
export class EquipmentHasComponents {
  @ManyToOne({
    entity: () => Equipment,
    fieldName: 'equipment_id',
    primary: true,
  })
  public equipment!: Equipment;
  @ManyToOne({
    entity: () => Component,
    fieldName: 'component_id',
    primary: true,
  })
  public component!: Component;
  [PrimaryKeyType]: [Equipment, Component];
  @Property()
  public createdAt = new Date();
  @Property({ onUpdate: () => new Date() })
  public updatedAt = new Date();
  @Property()
  public deletedAt?: Date;
  constructor(equipment: Equipment, component: Component) {
    this.equipment = equipment;
    this.component = component;
  }
  static build = (
    equipment: Equipment,
    component: Component,
  ): EquipmentHasComponents => {
    return new EquipmentHasComponents(equipment, component);
  };
}
