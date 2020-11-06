import {
  Collection,
  Entity,
  Enum,
  ManyToOne,
  OneToMany,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { Contract } from '@modules/contracts/domain/contract.entity';
import { Employee } from '@modules/employees/domain/employee.entity';
import { v4, validate } from 'uuid';
import { Product } from './product.entity';
export enum ProductTypes {
  equipament = 'equipament',
  component = 'component',
}
interface instanceContainer {
  serial_number: string;
  patrimony_code?: string;
  type: ProductTypes;
  product: Product;
  contract: Contract;
  employee: Employee;
}
@Entity({ tableName: 'product_instances' })
export class ProductInstance {
  @PrimaryKey()
  public readonly serial_number: string;
  @Property()
  public patrimony_code?: string;
  @Enum()
  public type: ProductTypes;
  @ManyToOne(() => Product, { fieldName: 'product_id' })
  public product: Product;
  @ManyToOne(() => Contract, { fieldName: 'contract_id' })
  public contract: Contract;
  @ManyToOne(() => Employee, { fieldName: 'employee_id' })
  public employee: Employee;
  @OneToMany({
    entity: () => ProductInstance,
    mappedBy: 'parent',
    orphanRemoval: true,
  })
  public parent = new Collection<ProductInstance>(this);
  @Property()
  public created_at = new Date();
  @Property({ onUpdate: () => new Date() })
  public updated_at = new Date();
  @Property()
  public deleted_at?: Date;

  constructor(container: instanceContainer) {
    this.serial_number = container.serial_number;
    this.patrimony_code = container.patrimony_code;
    this.type = ProductTypes[container.type];
    this.employee = container.employee;
    this.contract = container.contract;
    this.product = container.product;
  }

  static build = (container: instanceContainer): ProductInstance => {
    return new ProductInstance(container);
  };
}
