import { wrap } from '@mikro-orm/core';
import { EntityRepository, EntityManager } from '@mikro-orm/postgresql';
import { Pagination } from '@shared/core/pagination';
import { inject, injectable } from 'tsyringe';
import { Supplier } from '../domain/supplier.entity';
import { ISupplierRepository } from './supplierRepository';
@injectable()
export class SupplierRepository implements ISupplierRepository {
  private repository: EntityRepository<Supplier>;
  constructor(@inject('EntityManager') private entityManager: EntityManager) {
    this.repository = entityManager.getRepository(Supplier);
  }
  public create = async (supplier: Supplier): Promise<Supplier> => {
    if(!(supplier instanceof Supplier)) throw new Error(`Invalid Data Type`)
    await this.repository.persist(supplier).flush();
    return supplier;
  };
  public update = async (
    cnpj: string,
    data: any,
  ): Promise<Supplier> => {
    const supplier = await this.repository.findOne({cnpj})
    if(!supplier) throw new Error(`${data.matricula} dont exists`)
    wrap(supplier).assign(data)
    await this.repository.persist(data).flush();
    return supplier;
  };
  public all = async (pagination: Pagination): Promise<Supplier[]> => {
    return await this.repository.findAll()
  }
  public byId = async (id: string): Promise<Supplier | undefined> => {
    const supplier = await this.repository.findOne({ id });
    if (!supplier) return;
    return supplier;
  };
  public byCNPJ = async (cnpj: string): Promise<Supplier | undefined> => {
    const supplier = await this.repository.findOne({ cnpj });
    if (!supplier) return;
    return supplier;
  }
}
