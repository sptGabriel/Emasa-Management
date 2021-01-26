import { Entity, PrimaryKey, Property, Unique } from '@mikro-orm/core';
import { v4, validate } from 'uuid';
interface supplierContainer {
  id?: string;
  cnpj: string;
  supplier_name: string;
  supplier_email: string;
  description: string;
}
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
  public created_at = new Date();
  @Property({ onUpdate: () => new Date() })
  public updated_at = new Date();
  @Property()
  public deletedAt?: Date;
  constructor(container: supplierContainer) {
    this.id = container.id ? container.id : v4();
    this.supplier_email = container.supplier_email;
    this.supplier_name = container.supplier_name;
    this.cnpj = container.cnpj;
    this.description = container.description;
  }
  static build = ({
    id,
    cnpj,
    description,
    supplier_email,
    supplier_name,
  }: supplierContainer): Supplier => {
    if (id && !validate(id)) throw new Error(`Invalid UUID V4`);
    return new Supplier({id,supplier_name,supplier_email,description,cnpj});
  };
}
