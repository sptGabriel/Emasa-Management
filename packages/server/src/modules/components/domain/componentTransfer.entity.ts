import {
  Entity,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { v4 } from 'uuid';
export interface instanceTransferContainer {
  id?: string;
  component_id: string;
  new_departament: string;
  old_departament: string;
  description: string;
}
@Entity({ tableName: 'component_transfers_logs' })
export class ComponentTransfer {
  @PrimaryKey()
  public readonly id: number;
  @Property()
  public component_id!: string;
  @Property()
  public new_departament!: string;
  @Property()
  public old_departament!: string;
  @Property()
  public description!: string;
  @Property()
  public created_at = new Date();
  @Property()
  public deleted_at?: Date;

  constructor(container: instanceTransferContainer) {
    this.new_departament = container.new_departament;
    this.old_departament = container.old_departament;
    this.description = container.description;
    this.component_id = container.component_id
  }

  static build = (container: instanceTransferContainer): ComponentTransfer => {
    return new ComponentTransfer(container);
  };
}
