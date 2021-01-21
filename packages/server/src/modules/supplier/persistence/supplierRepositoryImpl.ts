import { RequestContext, wrap } from '@mikro-orm/core';
import { Pagination } from '@shared/core/pagination';
import { IBootstrap } from '@shared/infra/bootstrap';
import { inject, injectable } from 'tsyringe';
import { Supplier } from '../domain/supplier.entity';
import { ISupplierRepository } from './supplierRepository';
@injectable()
export class SupplierRepository implements ISupplierRepository {
  private em: any;
  constructor() {
    this.em = RequestContext.getEntityManager()
  }
  public create = async (supplier: Supplier): Promise<Supplier> => {
    if (!(supplier instanceof Supplier)) throw new Error(`Invalid Data Type`);
    await this.em.persist(supplier).flush();
    return supplier;
  };
  public update = async (cnpj: string, data: any): Promise<Supplier> => {
    const supplier = await this.em.findOne(Supplier, { cnpj });
    if (!supplier) throw new Error(`${data.matricula} dont exists`);
    wrap(supplier).assign(data);
    await this.em.persist(data).flush();
    return supplier;
  };
  public all = async (pagination: Pagination): Promise<Supplier[]> => {
    return await this.em.find(Supplier, {});
  };
  public byId = async (id: string): Promise<Supplier | undefined> => {
    const supplier = await this.em.findOne(Supplier, id);
    if (!supplier) return;
    return supplier;
  };
  public byCNPJ = async (cnpj: string): Promise<Supplier | undefined> => {
    const supplier = await this.em.findOne(Supplier, { cnpj });
    if (!supplier) return;
    return supplier;
  };
}
