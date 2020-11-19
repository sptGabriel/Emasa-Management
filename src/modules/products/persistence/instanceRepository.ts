import { Pagination } from '@shared/core/pagination';
import { ComponentInstance } from '../domain/componentInstance.entity';
export interface IComponentInstanceRepository {
  /**
   * @param {Pagination} pagination
   * @returns {Promise<[Product[] , number]>}
   */
  all(pagination: Pagination): Promise<ComponentInstance[]>;
  /**
   * @param {number} id[]
   * @returns {Promise<ProductInstance[] | undefined >}
   */
  getComponents(ids: string[]): Promise<ComponentInstance[]>;
  /**
   * @param {number} id[]
   * @returns {Promise<ProductInstance[] | undefined >}
   */
  byArray(ids: string[]): Promise<ComponentInstance[]>;
  /**
   * @param {number} id[]
   * @returns {Promise<ProductInstance[] | undefined >}
   */
  hasInstance(product_id: string, matricula: string): Promise<boolean>;
  /**
   * @param {number} id
   * @returns {Promise<ProductInstance>}
   */
  byId(id: string): Promise<ComponentInstance | undefined>;
  /**
   * @param {number} id
   * @returns {Promise<ComponentInstance>}
   */
  bySN(serial_number: string): Promise<ComponentInstance | undefined>;
  /**
   * @param {string} ProductInstanceProps
   * @returns {Promise<ComponentInstance>}
   */
  create(instance: ComponentInstance): Promise<ComponentInstance>;
}
