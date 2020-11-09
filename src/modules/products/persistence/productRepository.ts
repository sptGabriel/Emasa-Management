import { Pagination } from '@shared/core/pagination';
import { Product } from '../domain/product.entity';
export interface IProductRepository {
  /**
   * @param {Pagination} pagination
   * @returns {Promise<[Product[] , number]>}
   */
  all(pagination: Pagination): Promise<Product[]>;
  /**
   * @param {number} id[]
   * @returns {Promise<Product[] | undefined >}
   */
  byArray(ids: string[]): Promise<Product[]>;
    /**
   * @param {number} id[]
   * @returns {Promise<Product[] | undefined >}
   */
  findProductsWithStock(ids: string[]): Promise<Product[]>;
  /**
   * @param {number} id
   * @returns {Promise<Product>}
   */
  byId(id: string): Promise<Product | undefined>;

  /**
   * @param {string} CNPJ
   * @returns {Promise<Product>}
   */
  byCodReference(codReference: string): Promise<Product | undefined>;
  /**
   * @param {string} productProps
   * @returns {Promise<Product>}
   */
  create(product: Product): Promise<Product>;
}
