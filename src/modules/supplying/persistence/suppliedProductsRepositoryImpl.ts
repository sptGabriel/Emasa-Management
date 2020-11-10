import { wrap } from '@mikro-orm/core';
import { EntityRepository, EntityManager } from '@mikro-orm/postgresql';
import { Pagination } from '@shared/core/pagination';
import { inject, injectable } from 'tsyringe';
import { SuppliedProducts } from '../domain/suppliedProducts.entity';
import { ISuppliedProductsRepository } from './suppliedProductsRepository';
@injectable()
export class SuppliedProductsRepository implements ISuppliedProductsRepository {
  private repository: EntityRepository<SuppliedProducts>;
  constructor(@inject('EntityManager') private entityManager: EntityManager) {
    this.repository = entityManager.getRepository(SuppliedProducts);
  }
  public create = async (suppliedProducts: SuppliedProducts): Promise<SuppliedProducts> => {
    if(!(suppliedProducts instanceof SuppliedProducts)) throw new Error(`Invalid Data Type`)
    await this.repository.persist(suppliedProducts).flush();
    return suppliedProducts;
  };
  public update = async (
    supply_id: string,
    data: any,
  ): Promise<SuppliedProducts> => {
    const suppliedProducts = await this.repository.findOne({a})
    if(!suppliedProducts) throw new Error(`${data.matricula} dont exists`)
    wrap(suppliedProducts).assign(data)
    await this.repository.persist(data).flush();
    return suppliedProducts;
  };
  public all = async (pagination: Pagination): Promise<SuppliedProducts[]> => {
    return await this.repository.findAll()
  }
  public byId = async (supply_id: string): Promise<SuppliedProducts | undefined> => {
    const suppliedProducts = await this.repository.findOne({ supply_id });
    if (!suppliedProducts) return;
    return suppliedProducts;
  };
}
