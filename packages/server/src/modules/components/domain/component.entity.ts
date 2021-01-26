import {
  Collection,
  Entity,
  LoadStrategy,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryKey,
  Property,
  Unique,
} from '@mikro-orm/core';
import { Departament } from '@modules/departaments/domain/departament.entity';
import { EquipmentHasComponents } from '@modules/equipments/domain/equipamentHasComponents.entity';
import { Equipment } from '@modules/equipments/domain/equipment.entity';
import { v4 } from 'uuid';
import { Product } from '@modules/products/domain/product.entity';
import { ProductStocks } from '@modules/products/domain/stock.entity';
import { WithdrawalProduct } from '@modules/withdrawal/domain/withdrawalProducts.entity';
interface instanceContainer {
  id?: string;
  serial_number: string;
  stock_id: string;
  product: Product;
  departament: Departament;
}
@Entity({ tableName: 'components' })
export class Component {
  @PrimaryKey()
  public readonly id: string;
  @Unique({ name: 'component' })
  @Property()
  public readonly serial_number: string;
  @ManyToOne(() => Product, {
    fieldName: 'product_id',
    strategy: LoadStrategy.JOINED,
  })
  public product!: Product;
  @ManyToOne(() => ProductStocks, {
    fieldName: 'stock_id',
    mapToPk: true,
    strategy: LoadStrategy.JOINED,
  })
  public stock_id!: string;
  @OneToOne({
    entity: () => Equipment,
    mappedBy: 'component',
    strategy: LoadStrategy.JOINED,
  })
  public equipment: Equipment;
  @OneToMany(() => EquipmentHasComponents, comp => comp.component, {
    strategy: LoadStrategy.JOINED,
  })
  public equipments = new Collection<EquipmentHasComponents>(this);
  @OneToMany(() => WithdrawalProduct, Withdrawal => Withdrawal.component, {
    strategy: LoadStrategy.JOINED,
  })
  public withdrawal = new Collection<WithdrawalProduct>(this);
  @ManyToOne(() => Departament, {
    fieldName: 'departament_id',
    strategy: LoadStrategy.JOINED,
  })
  public departament!: Departament;
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
    this.stock_id = container.stock_id;
    this.departament = container.departament;
  }

  static build = (container: instanceContainer): Component => {
    return new Component(container);
  };
}
