import { wrap } from '@mikro-orm/core';
import { EntityRepository, EntityManager } from '@mikro-orm/postgresql';
import { Pagination } from '@shared/core/pagination';
import { IBootstrap } from '@shared/infra/bootstrap';
import { inject, injectable } from 'tsyringe';
import { ProductInstance } from '../domain/productInstance.entity';
import { IProductInstanceRepository } from './instanceRepository';
@injectable()
export class ProductInstanceRepository implements IProductInstanceRepository {
  private em: EntityManager;
  constructor(@inject('bootstrap') bootstrap: IBootstrap) {
    this.em = bootstrap.getDatabaseORM().getConnection().em.fork();
  }
  public byArray = async (ids: string[]): Promise<ProductInstance[]> => {
    return await this.em.find(ProductInstance, { serial_number: ids }, [
      'stock',
    ]);
  };
  public create = async (
    instance: ProductInstance,
  ): Promise<ProductInstance> => {
    if (!(instance instanceof ProductInstance))
      throw new Error(`Invalid Data Type`);
    await this.em.persist(instance).flush();
    return instance;
  };
  public update = async (
    serial_number: string,
    data: any,
  ): Promise<ProductInstance> => {
    const instance = await this.em.findOne(ProductInstance, { serial_number });
    if (!instance) throw new Error(`${data.matricula} dont exists`);
    wrap(instance).assign(data);
    await this.em.persist(data).flush();
    return instance;
  };
  public all = async (pagination: Pagination): Promise<ProductInstance[]> => {
    return await this.em.find(ProductInstance, {});
  };
  public byId = async (
    serial_number: string,
  ): Promise<ProductInstance | undefined> => {
    const instance = await this.em.findOne(ProductInstance, { serial_number });
    if (!instance) return;
    return instance;
  };
  public bySN = async (
    serial_number: string,
  ): Promise<ProductInstance | undefined> => {
    const instance = await this.em.findOne(ProductInstance, { serial_number });
    if (!instance) return;
    return instance;
  };
  public hasInstance = async (
    product_id: string,
    employee_id: string,
  ): Promise<boolean> => {
    const parent = await this.em.findOne(ProductInstance, {
      product: { id: product_id },
      employee: { id: employee_id },
    });
    if (!parent) return false;
    return true;
  };
}
