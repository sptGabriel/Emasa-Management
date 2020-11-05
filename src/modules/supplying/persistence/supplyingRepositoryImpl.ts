import { wrap } from '@mikro-orm/core';
import { EntityRepository, EntityManager } from '@mikro-orm/postgresql';
import { Pagination } from '@shared/core/pagination';
import { inject, injectable } from 'tsyringe';
import { Supplying } from '../domain/supplying.entity';
import { ISupplyingRepository } from './supplyingRepository';
@injectable()
export class SupplyingRepository implements ISupplyingRepository {
  private repository: EntityRepository<Supplying>;
  constructor(@inject('EntityManager') private entityManager: EntityManager) {
    this.repository = entityManager.getRepository(Supplying);
  }
  public create = async (supplying: Supplying): Promise<Supplying> => {
    if(!(supplying instanceof Supplying)) throw new Error(`Invalid Data Type`)
    await this.repository.persist(supplying).flush();
    return supplying;
  };
  public update = async (
    id: string,
    data: any,
  ): Promise<Supplying> => {
    const supplying = await this.repository.findOne({id})
    if(!supplying) throw new Error(`${data.matricula} dont exists`)
    wrap(supplying).assign(data)
    await this.repository.persist(data).flush();
    return supplying;
  };
  public all = async (pagination: Pagination): Promise<Supplying[]> => {
    return await this.repository.findAll()
  }
  public byId = async (id: string): Promise<Supplying | undefined> => {
    const supplying = await this.repository.findOne({ id });
    if (!supplying) return;
    return supplying;
  };
}
