import { Pagination } from '@shared/core/pagination';
import { ProductInstance } from '../domain/productInstance.entity';
export interface IProductInstanceRepository {
  /**
   * @param {Pagination} pagination
   * @returns {Promise<[Product[] , number]>}
   */
  all(pagination: Pagination): Promise<ProductInstance[]>;
  /**
   * @param {number} id[]
   * @returns {Promise<ProductInstance[] | undefined >}
   */
  byArray(ids: string[]): Promise<ProductInstance[]>;
    /**
   * @param {number} id[]
   * @returns {Promise<ProductInstance[] | undefined >}
   */
  hasInstance(product_id:string, employee:string): Promise<boolean>;
  /**
   * @param {number} id
   * @returns {Promise<ProductInstance>}
   */
  byId(id: string): Promise<ProductInstance | undefined>;
    /**
   * @param {number} id
   * @returns {Promise<ProductInstance>}
   */
  bySN(serial_number: string): Promise<ProductInstance | undefined>;
  /**
   * @param {string} ProductInstanceProps
   * @returns {Promise<ProductInstance>}
   */
  create(instance: ProductInstance): Promise<ProductInstance>;
}
