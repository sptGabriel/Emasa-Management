import {
  Collection,
  Entity,
  Enum,
  ManyToOne,
  OneToMany,
  PrimaryKey,
  PrimaryKeyType,
  Property,
} from '@mikro-orm/core';
import { Contract } from '@modules/contracts/domain/contract.entity';
import { Departament } from '@modules/departaments/domain/departament.entity';
import { Employee } from '@modules/employees/domain/employee.entity';
import { property } from 'tiny-types';
import { v4 } from 'uuid';
import { Product } from './product.entity';
import { ProductStocks } from './stock.entity';
export enum ProductTypes {
  equipment = 'equipment',
  component = 'component',
}
interface instanceContainer {
  id?:string;
  serial_number: string;
  patrimony_code?: string;
  type: ProductTypes;
  product: Product;
  stock: ProductStocks;
  employee: Employee;
  parent: ProductInstance | null
  departament: Departament | null;
}
@Entity({ tableName: 'product_instances' })
export class ProductInstance {
  @PrimaryKey()
  public readonly id: string;
  @PrimaryKey()
  public readonly serial_number: string;
  [PrimaryKeyType]: [string, string];
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
  @Property({persist:false})
  public departament: Departament | null;
  @ManyToOne({ entity: () => ProductInstance, nullable:true })
  public parent!: ProductInstance | null;
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
    this.id = container.id ? container.id : v4();
    this.serial_number = container.serial_number;
    this.patrimony_code = container.patrimony_code;
    this.type = container.type;
    this.employee = container.employee;
    this.stock = container.stock;
    this.product = container.product;
    this.departament = container.departament
    this.parent = container.parent
  }

  static build = (container: instanceContainer): ProductInstance => {
    return new ProductInstance(container);
  };
}
