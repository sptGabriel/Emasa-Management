import { RequestContext, wrap } from '@mikro-orm/core';
import { Pagination } from '@shared/core/pagination';
import { IBootstrap } from '@shared/infra/bootstrap';
import { inject, injectable } from 'tsyringe';
import { Product } from '../domain/product.entity';
import { IProductRepository } from './productRepository';
@injectable()
export class ProductRepository implements IProductRepository {
  private em: any;
  constructor() {
    this.em = RequestContext.getEntityManager()
  }
  public byArray = async (ids: string[]): Promise<Product[]> => {
    return await this.em.find(Product, ids, ['stock']);
  };
  public findProductsWithStock = async (ids: string[]) => {
    return await this.em.find(Product, { stock: { product: { id: ids } } });
  };
  public create = async (product: Product): Promise<Product> => {
    if (!(product instanceof Product)) throw new Error(`Invalid Data Type`);
    await this.em.persist(product).flush();
    return product;
  };
  public update = async (id: string, data: any): Promise<Product> => {
    const product = await this.em.findOne(Product, id);
    if (!product) throw new Error(`${data.matricula} dont exists`);
    wrap(product).assign(data);
    await this.em.persist(data).flush();
    return product;
  };
  public all = async (pagination: Pagination): Promise<Product[]> => {
    return await this.em.find(Product, {});
  };
  public byId = async (id: string): Promise<Product | undefined> => {
    const product = await this.em.findOne(Product, id);
    if (!product) return;
    return product;
  };
  public byCodReference = async (
    cod_reference: string,
  ): Promise<Product | undefined> => {
    const product = await this.em.findOne(Product, { cod_reference });
    if (!product) return;
    return product;
  };
}
