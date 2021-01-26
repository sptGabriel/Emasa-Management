import { Pagination } from '@shared/core/pagination';
import { Component } from '../domain/component.entity';
import { ComponentTransfer } from '../domain/componentTransfer.entity';
export interface IComponentRepository {
  /**
   * @param {Pagination} pagination
   * @returns {Promise<[Product[] , number]>}
   */
  all(pagination: Pagination): Promise<Component[]>;
  /**
   * @param {number} id[]
   * @returns {Promise<ProductInstance[] | undefined >}
   */
  getComponents(ids: string[]): Promise<Component[]>;
  /**
   * @param {number} id[]
   * @returns {Promise<ProductInstance[] | undefined >}
   */
  byArray(ids: string[]): Promise<Component[]>;
  /**
   * @param {number} id[]
   * @returns {Promise<ProductInstance[] | undefined >}
   */
  hasInstance(product_id: string, matricula: string): Promise<boolean>;
  /**
   * @param {number} id
   * @returns {Promise<ProductInstance>}
   */
  byId(id: string): Promise<Component | undefined>;
  /**
   * @param {number} id
   * @returns {Promise<Component>}
   */
  bySN(serial_number: string): Promise<Component | undefined>;
  /**
   * @param {number} id
   * @returns {Promise<Component>}
   */
  bySN2(serial_number: string): Promise<Component | undefined>;
  /**
   * @param {string} ProductInstanceProps
   * @returns {Promise<Component>}
   */
  create(instance: Component): Promise<Component>;
  /**
   * @param {string} ProductInstanceProps
   * @returns {Promise<Component>}
   */
  componentTransfer(instance: ComponentTransfer, component:Component): Promise<ComponentTransfer>;
    /**
   * @param {string} ProductInstanceProps
   * @returns {Promise<Component>}
   */
}
