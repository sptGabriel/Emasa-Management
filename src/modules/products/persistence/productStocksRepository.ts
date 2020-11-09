import { Pagination } from '@shared/core/pagination';
import { ProductStocks } from '../domain/stock.entity';
export interface IProductStocksRepository {
  /**
   * @param {Pagination} pagination
   * @returns {Promise<[Product[] , number]>}
   */
  all(pagination: Pagination): Promise<ProductStocks[]>;
  /**
   * @param {number} id[]
   * @returns {Promise<Product[] | undefined >}
   */
  byArray(ids: string[]): Promise<ProductStocks[]>;
  /**
   * @param {number} id
   * @returns {Promise<Product>}
   */
  byId(product_id: string): Promise<ProductStocks | undefined>;
  /**
   * @param {string} productProps
   * @returns {Promise<Product>}
   */
  addProductStock(product_id: string, quantity: number): Promise<ProductStocks>;
}
