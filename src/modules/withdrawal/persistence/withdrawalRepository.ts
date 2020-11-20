import { Pagination } from '@shared/core/pagination';
import { Withdrawal } from '../domain/withdrawal.entity';
import { WithdrawalComponents } from '../domain/withdrawalComponents.entity';
export interface IWithdrawalRepository {
  
  all(pagination: Pagination): Promise<Withdrawal[]>;
  /**
   * @param {number} id[]
   * @returns {Promise<ProductInstance[] | undefined >}
   */
  byArray(ids: string[]): Promise<Withdrawal[]>;
  /**
   * @param {number} id
   * @returns {Promise<EquipmentInstance>}
   */
  byId(id: string): Promise<Withdrawal | undefined>;
  /**
   * @param {number} id
   * @returns {Promise<EquipmentInstance>}
   */
  bySN(sn: string): Promise<WithdrawalComponents | undefined>;
    /**
   * @param {number} id
   * @returns {Promise<EquipmentInstance>}
   */
  withdrawalProduct(withdrawal:WithdrawalComponents): Promise<WithdrawalComponents>;
  /**
   * @param {string} ProductInstanceProps
   * @returns {Promise<ComponentInstance>}
   */
  create(instance: Withdrawal): Promise<Withdrawal>;
}
