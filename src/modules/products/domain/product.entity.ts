import { Collection, Entity, IdentifiedReference, ManyToOne, OneToMany, OneToOne, PrimaryKey, Property, Reference } from '@mikro-orm/core';
import { v4, validate } from 'uuid';
import { ProductCategory } from './productCategory.entity';
import { ProductStocks } from './stock.entity';
interface productContainer {
  id?: string;
  name: string;
  cod_reference: string;
  category: ProductCategory;
  has_instances: boolean;
}
@Entity({ tableName: 'products' })
export class Product {
  @PrimaryKey()
  public readonly id: string;
  @Property()
  public name: string;
  @Property()
  public cod_reference: string;
  @Property()
  public has_instances: boolean;
  @Property({default:0})
  public current_price: number;
  @ManyToOne({ entity: () => ProductCategory, fieldName: 'category_id' })
  public category!: IdentifiedReference<ProductCategory>;
  @OneToMany(() => ProductStocks, stock => stock.product)
  public stock = new Collection<ProductStocks>(this);
  @Property()
  public created_at = new Date();
  @Property({ onUpdate: () => new Date() })
  public updated_at = new Date();
  @Property({default:null})
  public deleted_at?: Date;
  constructor(container: productContainer) {
    this.id = container.id ? container.id : v4();
    this.cod_reference = container.cod_reference;
    this.category = Reference.create(container.category);
    this.name = container.name;
    this.has_instances = container.has_instances;
  }
  static build = ({
    id,
    category,
    cod_reference,
    name,
    has_instances
  }: productContainer): Product => {
    if (id && !validate(id)) throw new Error(`invalid uuid`);
    return new Product({ id, category, cod_reference, name, has_instances });
  };

  // public toJSON = () => {
  //   return {
  //     id:this.id,
  //     cod_reference:this.cod_reference,
  //     name:this.name,
  //     category_id: this.category_id,
  //     has_instances:this.has_instances,
  //     created_at:this.created_at,
  //     updated_at:this.updated_at,
  //     deleted_at:this.deleted_at ? this.deleted_at : null
  //   }
  // }
    // @OneToOne(() => ProductStocks, stock => stock.product, {
  //   mappedBy: 'product',
  //   serializer: value => value.quatity,
  //   serializedName: 'quantity',
  // })
  // public stock: ProductStocks;
}
