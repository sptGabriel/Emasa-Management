import { RequestContext, wrap } from '@mikro-orm/core';
import { ProductStocks } from '@modules/products/domain/stock.entity';
import { Pagination } from '@shared/core/pagination';
import { IBootstrap } from '@shared/infra/bootstrap';
import { inject, injectable } from 'tsyringe';
import { Supply } from '../domain/supplying.entity';
import { ISupplyingRepository } from './supplyingRepository';
@injectable()
export class SupplyingRepository implements ISupplyingRepository {
  private em: any;
  constructor() {
    this.em = RequestContext.getEntityManager()
  }
  public create = async (
    supplying: Supply,
    stock: ProductStocks[],
  ): Promise<Supply> => {
    if (!(supplying instanceof Supply)) throw new Error(`Invalid Data Type`);
    await this.em.begin();
    try {
      await this.em.persist(supplying);
      await this.em.fork().createQueryBuilder(ProductStocks).insert(stock);
      await this.em.commit();
      return supplying;
    } catch (e) {
      console.log(e);
      await this.em.rollback();
      throw e;
    }
  };
  public update = async (id: string, data: any): Promise<Supply> => {
    const supplying = await this.em.findOne(Supply, id);
    if (!supplying) throw new Error(`${data.matricula} dont exists`);
    wrap(supplying).assign(data);
    await this.em.persist(data).flush();
    return supplying;
  };
  public all = async (pagination: Pagination): Promise<Supply[]> => {
    return await this.em.find(Supply, {});
  };
  public byId = async (id: string): Promise<Supply | undefined> => {
    const supplying = await this.em.findOne(Supply, id);
    if (!supplying) return;
    return supplying;
  };
  public byContract = async (id: string): Promise<Supply | undefined> => {
    const supplying = await this.em.findOne(Supply, {
      contract: { id },
    });
    if (!supplying) return;
    return supplying;
  };
}
