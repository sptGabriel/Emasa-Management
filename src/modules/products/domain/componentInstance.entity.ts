import {
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryKey,
  PrimaryKeyType,
  Property,
} from '@mikro-orm/core';
import { Departament } from '@modules/departaments/domain/departament.entity';
import { Employee } from '@modules/employees/domain/employee.entity';
import { EquipmentInstance } from '@modules/equipments/domain/equipment.entity';
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
  product: Product;
  employee: Employee;
  equipament: EquipmentInstance;

}
@Entity({ tableName: 'component_instances' })
export class ComponentInstance {
  @PrimaryKey()
  public readonly id: string;
  @PrimaryKey()
  public readonly serial_number: string;
  [PrimaryKeyType]: [string, string];
  @ManyToOne(() => Product, { fieldName: 'product_id' })
  public product!: Product;
  @ManyToOne(() => ProductStocks, { fieldName: 'stock_id' })
  public stock!: ProductStocks;
  @ManyToOne(() => Employee, { fieldName: 'employee_id' })
  public employee!: Employee;
  @Property({persist:false})
  public departament: Departament | null;
  @OneToOne({
    entity: () => EquipmentInstance,
    mappedBy : 'component',
  })
  public equipament: EquipmentInstance;
  // @ManyToOne({ entity: () => ProductInstance, nullable:true })
  // public parent!: ProductInstance | null;
  // @OneToMany({
  //   entity: () => ProductInstance,
  //   mappedBy: 'parent',
  //   orphanRemoval: true,
  // })
  // public parents = new Collection<ProductInstance>(this);
  @Property()
  public created_at = new Date();
  @Property({ onUpdate: () => new Date() })
  public updated_at = new Date();
  @Property()
  public deleted_at?: Date;

  constructor(container: instanceContainer) {
    this.id = container.id ? container.id : v4();
    this.serial_number = container.serial_number;
    this.product = container.product;
    this.equipament = container.equipament
    this.employee = container.employee
  }

  static build = (container: instanceContainer): ComponentInstance => {
    return new ComponentInstance(container);
  };
}
