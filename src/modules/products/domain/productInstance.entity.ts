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
import { Product } from './product.entity';
import { ProductStocks } from './stock.entity';
export enum ProductTypes {
  equipment = 'equipment',
  component = 'component',
}
interface instanceContainer {
  serial_number: string;
  patrimony_code?: string;
  type: ProductTypes;
  product: Product;
  stock: ProductStocks;
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
  public product!: Product;
  @ManyToOne(() => ProductStocks, { fieldName: 'stock_id' })
  public stock!: ProductStocks;
  @ManyToOne(() => Employee, { fieldName: 'employee_id' })
  public employee!: Employee;
  @ManyToOne({ entity: () => ProductInstance })
  public parent!: ProductInstance;
  @OneToMany({
    entity: () => ProductInstance,
    mappedBy: 'parent',
    orphanRemoval: true,
  })
  public parents = new Collection<ProductInstance>(this);
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
    this.stock = container.stock;
    this.product = container.product;
  }

  static build = (container: instanceContainer): ProductInstance => {
    return new ProductInstance(container);
  };
}
