import { LoadStrategy, wrap } from '@mikro-orm/core';
import {  EntityManager } from '@mikro-orm/postgresql';
import { Pagination } from '@shared/core/pagination';
import { IBootstrap } from '@shared/infra/bootstrap';
import { inject, injectable } from 'tsyringe';
import { ProductCategory } from '../domain/productCategory.entity';
import { IProductCategoryRepository } from './productCategoryRepository';
@injectable()
export class ProductCategoryRepository implements IProductCategoryRepository {
  private em: EntityManager;
  constructor(@inject('bootstrap') bootstrap: IBootstrap) {
    this.em = bootstrap.getDatabaseORM().getConnection().em.fork();
  }
  public create = async (
    category: ProductCategory,
  ): Promise<ProductCategory> => {
    if (!(category instanceof ProductCategory))
      throw new Error(`Invalid Data Type`);
    await this.em.persist(category).flush();
    return category;
  };
  public update = async (id: string, data: any): Promise<ProductCategory> => {
    const category = await this.em.findOne(ProductCategory, id);
    if (!category) throw new Error(`${data.matricula} dont exists`);
    wrap(category).assign(data);
    await this.em.persist(data).flush();
    return category;
  };
  public all = async (pagination: Pagination): Promise<ProductCategory[]> => {
    return await this.em.find(ProductCategory, {});
  };
  public byId = async (id: string): Promise<ProductCategory | undefined> => {
    const category = await this.em.findOne(ProductCategory, id, {
      populate: { parents: LoadStrategy.JOINED, parent: LoadStrategy.JOINED },
    });
    if (!category) return;
    return category;
  };
  public byCategoryName = async (
    name: string,
  ): Promise<ProductCategory | undefined> => {
    const category = await this.em.findOne(ProductCategory, { name });
    if (!category) return;
    return category;
  };
}
