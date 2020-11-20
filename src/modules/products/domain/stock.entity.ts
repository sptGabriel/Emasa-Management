import {
  Entity,
  IdentifiedReference,
  LoadStrategy,
  ManyToOne,
  OneToOne,
  PrimaryKey,
  Property,
  Reference,
} from '@mikro-orm/core';
import { Supply } from '@modules/supplying/domain/supplying.entity';
import { v4 } from 'uuid';
import { Product } from './product.entity';
interface productStockProps {
  id?: string;
  supply: Supply;
  product: Product;
  quantity: number;
}
@Entity({ tableName: 'product_stocks' })
export class ProductStocks {
  @PrimaryKey()
  public readonly id: string;
  @OneToOne({
    entity: () => Supply,
    inversedBy: 'product_stock',
    fieldName: 'supply_id',
    strategy: LoadStrategy.JOINED,
  })
  public supply: Supply;
  @ManyToOne({
    entity: () => Product,
    fieldName: 'product_id',
    strategy: LoadStrategy.JOINED,
  })
  public product!: IdentifiedReference<Product>;
  @Property({ default: null })
  public quantity: number;
  @Property()
  public created_at = new Date();
  @Property({ onUpdate: () => new Date() })
  public updated_at = new Date();
  @Property()
  public deleted_at?: Date;
  constructor(container: productStockProps) {
    this.id = container.id ? container.id : v4();
    this.product = Reference.create(container.product);
    this.quantity = container.quantity;
    this.supply = container.supply;
  }
  static build = ({
    id,
    quantity,
    product,
    supply,
  }: productStockProps): ProductStocks => {
    return new ProductStocks({ id, quantity, product, supply });
  };
}
