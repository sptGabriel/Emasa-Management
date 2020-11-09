import { wrap } from '@mikro-orm/core';
import { EntityRepository, EntityManager } from '@mikro-orm/postgresql';
import { Pagination } from '@shared/core/pagination';
import { inject, injectable } from 'tsyringe';
import { ProductStocks } from '../domain/stock.entity';
import { IProductStocksRepository } from './productStocksRepository';
@injectable()
export class ProductStocksRepository implements IProductStocksRepository {
  private repository: EntityRepository<ProductStocks>;
  constructor(@inject('EntityManager') private entityManager: EntityManager) {
    this.repository = entityManager.getRepository(ProductStocks);
  }
  public byArray = async (ids: string[]): Promise<ProductStocks[]> =>{
    throw new Error('Method not implemented.');
  }
  public addProductStock = async (
    product_id: string,
    quantity: number,
  ): Promise<ProductStocks> => {
    const queryBuilder = this.entityManager.createQueryBuilder(ProductStocks);
    const stock = queryBuilder
      .update({ quantity: queryBuilder.raw(`quantity + ${quantity}`) })
      .where({ product_id }).getResult().then((stock) => {
        return stock[0]
      });
    return stock;
  };
  // public update = async (id: string, data: any): Promise<ProductStocks> => {
  //   const product = await this.repository.findOne({ id });
  //   if (!product) throw new Error(`${data.matricula} dont exists`);
  //   wrap(product).assign(data);
  //   await this.repository.persist(data).flush();
  //   return product;
  // };
  public all = async (pagination: Pagination): Promise<ProductStocks[]> => {
    return await this.repository.findAll();
  };
  public byId = async (id: string): Promise<ProductStocks | undefined> => {
    const stock = await this.repository.findOne({ product: { id } });
    if (!stock) return;
    return stock;
  };
}
