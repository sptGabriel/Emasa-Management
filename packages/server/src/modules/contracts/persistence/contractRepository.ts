import { Pagination } from '@shared/core/pagination';
import { Contract } from '../domain/contract.entity';

export interface IContractRepository {
  /**
   * @param {Pagination} pagination
   * @returns {Promise<[Contract[] , number]>}
   */
  all(pagination: Pagination): Promise<Contract[]>;

  /**
   * @param {number} id
   * @returns {Promise<User>}
   */
  byId(id: string): Promise<Contract | undefined>;

  /**
   * @param {string} signature
   * @returns {Promise<Contract>}
   */
  bySignature(signature: string): Promise<Contract | undefined>;
  /**
   * @param {string} signature
   * @param {string} name
   * @returns {Promise<Contract>}
   */
  create(contract: Contract): Promise<Contract>;
}
