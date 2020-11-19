import {
  Collection,
  Entity,
  Filter,
  LoadStrategy,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryKey,
  PrimaryKeyType,
  Property,
  Unique,
} from '@mikro-orm/core';
import { Departament } from '@modules/departaments/domain/departament.entity';
import { EquipmentHasComponents } from '@modules/equipments/domain/equipamentHasComponents.entity';
import { EquipmentInstance } from '@modules/equipments/domain/equipment.entity';
import { v4 } from 'uuid';
import { Product } from './product.entity';
import { ProductStocks } from './stock.entity';
interface instanceContainer {
  id?: string;
  serial_number: string;
  stock: ProductStocks;
  product: Product;
  departament: Departament;
}
@Filter({
  name: 'componentIsEquipment',
  cond: args => ({ equipament: { id: { $nin: args.ids } } }),
})
@Entity({ tableName: 'components' })
export class ComponentInstance {
  @PrimaryKey()
  public readonly id: string;
  @Unique({ name: 'component' })
  @Property()
  public readonly serial_number: string;
  @ManyToOne(() => Product, { fieldName: 'product_id' })
  public product!: Product;
  @ManyToOne(() => ProductStocks, { fieldName: 'stock_id' })
  public stock!: ProductStocks;
  @OneToOne({
    entity: () => EquipmentInstance,
    mappedBy: 'component',
    strategy: LoadStrategy.JOINED,
  })
  public equipment: EquipmentInstance;
  @OneToMany(() => EquipmentHasComponents, comp => comp.component, {
    strategy: LoadStrategy.JOINED,
  })
  public equipments = new Collection<EquipmentHasComponents>(this);
  @Property({ persist: false })
  public departament?: Departament;
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
    this.stock = container.stock;
    this.departament = container.departament;
  }

  static build = (container: instanceContainer): ComponentInstance => {
    return new ComponentInstance(container);
  };
}
