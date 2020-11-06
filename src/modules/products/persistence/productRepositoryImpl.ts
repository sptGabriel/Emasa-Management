import { wrap } from '@mikro-orm/core';
import { EntityRepository, EntityManager } from '@mikro-orm/postgresql';
import { Pagination } from '@shared/core/pagination';
import { inject, injectable } from 'tsyringe';
import { Product } from '../domain/product.entity';
import { IProductRepository } from './productRepository';
@injectable()
export class ProductRepository implements IProductRepository {
  private repository: EntityRepository<Product>;
  constructor(@inject('EntityManager') private entityManager: EntityManager) {
    this.repository = entityManager.getRepository(Product);
  }
  public byArray = async (ids: string[]): Promise<Product[]>  => {
    return await this.repository.find(ids)
  }
  public create = async (product: Product): Promise<Product> => {
    if(!(product instanceof Product)) throw new Error(`Invalid Data Type`)
    await this.repository.persist(product).flush();
    return product;
  };
  public update = async (
    id: string,
    data: any,
  ): Promise<Product> => {
    const product = await this.repository.findOne({id})
    if(!product) throw new Error(`${data.matricula} dont exists`)
    wrap(product).assign(data)
    await this.repository.persist(data).flush();
    return product;
  };
  public all = async (pagination: Pagination): Promise<Product[]> => {
    return await this.repository.findAll()
  }
  public byId = async (id: string): Promise<Product | undefined> => {
    const product = await this.repository.findOne({ id });
    if (!product) return;
    return product;
  };
  public byCodReference = async (codReference: string): Promise<Product | undefined> => {
    const product = await this.repository.findOne({ codReference });
    if (!product) return;
    return product;
  }
}
