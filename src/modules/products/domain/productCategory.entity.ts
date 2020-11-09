import {
  Collection,
  Entity,
  IdentifiedReference,
  ManyToOne,
  OneToMany,
  PrimaryKey,
  Property,
  Reference,
  Unique,
} from '@mikro-orm/core';
import { v4, validate } from 'uuid';
import { Product } from './product.entity';

interface categoryContainer {
  id?:string;
  parent: ProductCategory;
  name:string;
}

@Entity({ tableName: 'product_categories' })
export class ProductCategory {
  @PrimaryKey()
  public readonly id: string;
  @ManyToOne(() => ProductCategory, {
    nullable: true,
    wrappedReference: true,
    fieldName: 'parent_id',
  })
  public parent: IdentifiedReference<ProductCategory>;
  @Property()
  public name: string;
  @OneToMany(() => Product, product => product.category)
  public products = new Collection<Product>(this);
  @OneToMany({
    entity: () => ProductCategory,
    mappedBy: 'parent',
    orphanRemoval: true,
  })
  public parents = new Collection<ProductCategory>(this);
  @Property()
  public createdAt = new Date();
  @Property({ onUpdate: () => new Date() })
  public updatedAt = new Date();
  @Property()
  public deletedAt?: Date;

  constructor(container:categoryContainer){
    this.id = container.id ? container.id : v4();
    this.name = container.name;
    this.parent = Reference.create(container.parent)
  }

  static build = (
    {id,name,parent}:categoryContainer
  ): ProductCategory => {
    const isValidUUID = id ? validate(id) : null;
    if (isValidUUID === false) throw new Error(`Invalid UUID V4`);
    return new ProductCategory({id,name,parent});
  };
}
