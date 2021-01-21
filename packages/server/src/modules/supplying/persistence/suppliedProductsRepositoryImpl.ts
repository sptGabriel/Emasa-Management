import { RequestContext, wrap } from '@mikro-orm/core';
import { Pagination } from '@shared/core/pagination';
import { IBootstrap } from '@shared/infra/bootstrap';
import { inject, injectable } from 'tsyringe';
import { SuppliedProducts } from '../domain/suppliedProducts.entity';
import { ISuppliedProductsRepository } from './suppliedProductsRepository';
@injectable()
export class SuppliedProductsRepository implements ISuppliedProductsRepository {
  private em: any;
  constructor() {
    this.em = RequestContext.getEntityManager()
  }
  public create = async (
    suppliedProducts: SuppliedProducts,
  ): Promise<SuppliedProducts> => {
    if (!(suppliedProducts instanceof SuppliedProducts))
      throw new Error(`Invalid Data Type`);
    await this.em.persist(suppliedProducts).flush();
    return suppliedProducts;
  };
  public update = async (id: string, data: any): Promise<SuppliedProducts> => {
    const suppliedProducts = await this.em.findOne(SuppliedProducts, {
      supply: { id },
    });
    if (!suppliedProducts) throw new Error(`${data.matricula} dont exists`);
    wrap(suppliedProducts).assign(data);
    await this.em.persist(data).flush();
    return suppliedProducts;
  };
  public all = async (pagination: Pagination): Promise<SuppliedProducts[]> => {
    return await this.em.find(SuppliedProducts, {});
  };
  public byId = async (id: string): Promise<SuppliedProducts | undefined> => {
    const suppliedProducts = await this.em.findOne(SuppliedProducts, {
      supply: id,
    });
    if (!suppliedProducts) return;
    return suppliedProducts;
  };
}
