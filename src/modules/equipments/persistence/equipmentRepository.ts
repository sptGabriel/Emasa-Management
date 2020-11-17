import { Pagination } from '@shared/core/pagination';
import { EquipmentInstance  } from '../domain/equipment.entity';

export interface IEquipmentRepository {
  /**
   * @param {Pagination} pagination
   * @returns {Promise<[Contract[] , number]>}
   */
  all(pagination: Pagination): Promise<EquipmentInstance[]>;

  /**
   * @param {number} id
   * @returns {Promise<User>}
   */
  byId(id: string): Promise<EquipmentInstance | undefined>;

  /**
   * @param {string} signature
   * @param {string} name
   * @returns {Promise<Contract>}
   */
  create(contract: EquipmentInstance): Promise<EquipmentInstance>;
}
