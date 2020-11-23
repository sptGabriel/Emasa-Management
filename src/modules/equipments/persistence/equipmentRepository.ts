import { Component } from '@modules/components/domain/component.entity';
import { ComponentTransfer } from '@modules/components/domain/componentTransfer.entity';
import { Pagination } from '@shared/core/pagination';
import { Equipment } from '../domain/equipment.entity';
export interface IEquipmentRepository {
  getEquipandComponents(components: string[]): Promise<Equipment[]>;
  bySN(component_sn: string): Promise<Equipment | undefined>;
  /**
   * @param {Pagination} pagination
   * @returns {Promise<[Product[] , number]>}
   */
  all(pagination: Pagination): Promise<Equipment[]>;
  /**
   * @param {number} id[]
   * @returns {Promise<ProductInstance[] | undefined >}
   */
  byArray(ids: string[]): Promise<Equipment[]>;
  /**
   * @param {number} id[]
   * @returns {Promise<EquipmentInstance[] | undefined >}
   */
  hasInstance(product_id: string, matricula: string): Promise<boolean>;
  /**
   * @param {number} id
   * @returns {Promise<EquipmentInstance>}
   */
  byId(id: string): Promise<Equipment | undefined>;
  /**
   * @param {number} id
   * @returns {Promise<EquipmentInstance>}
   */
  byPatrimony(patrimony_code: string): Promise<Equipment | undefined>;
  /**
   * @param {string} ProductInstanceProps
   * @returns {Promise<ComponentInstance>}
   */
  create(instance: Equipment): Promise<Equipment>;
      /**
   * @param {string} ProductInstanceProps
   * @returns {Promise<Component>}
   */
  equipmentTransfer(instance: ComponentTransfer[], components:Component[], departament:string): Promise<ComponentTransfer[]>;
}
