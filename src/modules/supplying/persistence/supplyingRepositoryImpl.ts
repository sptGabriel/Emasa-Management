import { wrap } from '@mikro-orm/core';
import { EntityRepository, EntityManager } from '@mikro-orm/postgresql';
import { ProductStocks } from '@modules/products/domain/stock.entity';
import { Pagination } from '@shared/core/pagination';
import { inject, injectable } from 'tsyringe';
import { Supply } from '../domain/supplying.entity';
import { ISupplyingRepository } from './supplyingRepository';
@injectable()
export class SupplyingRepository implements ISupplyingRepository {
  private supplyingRepository: EntityRepository<Supply>;
  constructor(@inject('EntityManager') private entityManager: EntityManager) {
    this.supplyingRepository = entityManager.fork().getRepository(Supply);
  }
  public create = async (
    supplying: Supply,
    stock: ProductStocks[],
  ): Promise<Supply> => {
    if (!(supplying instanceof Supply)) throw new Error(`Invalid Data Type`);
    await this.entityManager.begin();
    try {
      await this.supplyingRepository.persist(supplying);
      await this.entityManager
        .fork()
        .createQueryBuilder(ProductStocks)
        .insert(stock)
      await this.entityManager.commit();
      return supplying;
    } catch (e) {
      console.log(e);
      await this.entityManager.rollback();
      throw e;
    }
  };
  public update = async (id: string, data: any): Promise<Supply> => {
    const supplying = await this.supplyingRepository.findOne({ id });
    if (!supplying) throw new Error(`${data.matricula} dont exists`);
    wrap(supplying).assign(data);
    await this.supplyingRepository.persist(data).flush();
    return supplying;
  };
  public all = async (pagination: Pagination): Promise<Supply[]> => {
    return await this.supplyingRepository.findAll();
  };
  public byId = async (id: string): Promise<Supply | undefined> => {
    const supplying = await this.supplyingRepository.findOne({ id });
    if (!supplying) return;
    return supplying;
  };
  public byContract = async (id: string): Promise<Supply | undefined> => {
    const supplying = await this.supplyingRepository.findOne({
      contract: { id },
    });
    if (!supplying) return;
    return supplying;
  };
}
