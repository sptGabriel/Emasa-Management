import { Pagination } from '@shared/core/pagination';
import { EquipmentInstance } from '../domain/equipment.entity';
export interface IEquipmentRepository {
  bySN(component_sn: string):Promise<EquipmentInstance | undefined>;
  /**
   * @param {Pagination} pagination
   * @returns {Promise<[Product[] , number]>}
   */
  all(pagination: Pagination): Promise<EquipmentInstance[]>;
  /**
   * @param {number} id[]
   * @returns {Promise<ProductInstance[] | undefined >}
   */
  byArray(ids: string[]): Promise<EquipmentInstance[]>;
  /**
   * @param {number} id[]
   * @returns {Promise<EquipmentInstance[] | undefined >}
   */
  hasInstance(product_id: string, matricula: string): Promise<boolean>;
  /**
   * @param {number} id
   * @returns {Promise<EquipmentInstance>}
   */
  byId(id: string): Promise<EquipmentInstance | undefined>;
  /**
   * @param {number} id
   * @returns {Promise<EquipmentInstance>}
   */
  byPatrimony(patrimony_code: string): Promise<EquipmentInstance | undefined>;
  /**
   * @param {string} ProductInstanceProps
   * @returns {Promise<ComponentInstance>}
   */
  create(instance: EquipmentInstance): Promise<EquipmentInstance>;
}
