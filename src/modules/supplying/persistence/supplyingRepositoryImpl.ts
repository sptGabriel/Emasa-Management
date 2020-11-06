import { wrap } from '@mikro-orm/core';
import { EntityRepository, EntityManager } from '@mikro-orm/postgresql';
import { Pagination } from '@shared/core/pagination';
import { inject, injectable } from 'tsyringe';
import {
  CreateSupplyDTO,
  SupplyDTO,
} from '../application/dtos/createSupply_DTO';
import { SuppliedProducts } from '../domain/suppliedProducts.entity';
import { Supply } from '../domain/supplying.entity';
import { ISupplyingRepository } from './supplyingRepository';
@injectable()
export class SupplyingRepository implements ISupplyingRepository {
  private supplyingRepository: EntityRepository<Supply>;
  private suppliedProductsRepository: EntityRepository<SuppliedProducts>;
  constructor(@inject('EntityManager') private entityManager: EntityManager) {
    this.supplyingRepository = entityManager.getRepository(Supply);
    this.suppliedProductsRepository = entityManager.getRepository(
      SuppliedProducts,
    );
  }
  public create = async (supplying: Supply): Promise<Supply> => {
    if (!(supplying instanceof Supply)) throw new Error(`Invalid Data Type`);
    await this.supplyingRepository.persist(supplying).flush();
    return supplying;
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
}
