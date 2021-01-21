import { LoadStrategy, RequestContext } from '@mikro-orm/core';
import { Pagination } from '@shared/core/pagination';
import { IBootstrap } from '@shared/infra/bootstrap';
import { inject, injectable } from 'tsyringe';
import { ProductStocks } from '../domain/stock.entity';
import { IProductStocksRepository } from './productStocksRepository';
@injectable()
export class ProductStocksRepository implements IProductStocksRepository {
  private em: any;
  constructor() {
    this.em = RequestContext.getEntityManager()
  }
  public byArray = async (ids: string[]): Promise<ProductStocks[]> => {
    throw new Error('Method not implemented.');
  };
  public addProductStock = async (
    product_id: string,
    quantity: number,
  ): Promise<ProductStocks> => {
    const queryBuilder = await this.em.createQueryBuilder(ProductStocks);
    const stock = await queryBuilder
      .update({ quantity: queryBuilder.raw(`quantity + ${quantity}`) })
      .where({ product_id })
      .getResult()
      .then((stock: any) => {
        return stock[0];
      });
    return stock;
  };
  public all = async (pagination: Pagination): Promise<ProductStocks[]> => {
    return await this.em.find(ProductStocks, {});
  };
  public byId = async (id: string): Promise<ProductStocks | undefined> => {
    const stock = await this.em.findOne(ProductStocks, { product: { id } });
    if (!stock) return;
    return stock;
  };
  public byContractAndProduct = async (
    contract_id: string,
    product_id: string,
  ) => {
    const stock = await this.em.findOne(
      ProductStocks,
      {
        product: { id: product_id },
        supply: { contract: { id: contract_id } },
      },
      {
        populate: ['product', 'product.category', 'supply', 'supply.contract'],
        strategy: LoadStrategy.JOINED,
      },
    );
    if (!stock) return undefined;
    return stock;
  };
}
