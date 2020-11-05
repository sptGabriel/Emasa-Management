import { wrap } from '@mikro-orm/core';
import { EntityRepository, EntityManager } from '@mikro-orm/postgresql';
import { Pagination } from '@shared/core/pagination';
import { inject, injectable } from 'tsyringe';
import { ProductCategory } from '../domain/productCategory.entity';
import { IProductCategoryRepository } from './productCategoryRepository';
@injectable()
export class ProductCategoryRepository implements IProductCategoryRepository {
  private repository: EntityRepository<ProductCategory>;
  constructor(@inject('EntityManager') private entityManager: EntityManager) {
    this.repository = entityManager.getRepository(ProductCategory);
  }
  public create = async (category: ProductCategory): Promise<ProductCategory> => {
    if(!(category instanceof ProductCategory)) throw new Error(`Invalid Data Type`)
    await this.repository.persist(category).flush();
    return category;
  };
  public update = async (
    id: string,
    data: any,
  ): Promise<ProductCategory> => {
    const category = await this.repository.findOne({id})
    if(!category) throw new Error(`${data.matricula} dont exists`)
    wrap(category).assign(data)
    await this.repository.persist(data).flush();
    return category;
  };
  public all = async (pagination: Pagination): Promise<ProductCategory[]> => {
    return await this.repository.findAll()
  }
  public byId = async (id: string): Promise<ProductCategory | undefined> => {
    const category = await this.repository.findOne({ id });
    if (!category) return;
    return category;
  };
  public byCategoryName = async (name: string): Promise<ProductCategory | undefined> => {
    const category = await this.repository.findOne({ name });
    if (!category) return;
    return category;
  }
}
