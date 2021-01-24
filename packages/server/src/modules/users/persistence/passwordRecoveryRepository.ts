import { Employee } from '@modules/employees/domain/employee.entity';
import { Pagination } from '@shared/core/pagination';
import { PasswordRecovery } from '../domain/passwordRecovery.entity';

export interface IPasswordRecoveryRepository {
  /**
   * @param {Pagination} pagination
   * @returns {Promise<[Employee[] , number]>}
   */
  all(pagination: Pagination): Promise<PasswordRecovery[]>;

  /**
   * @param {string} login
   * @returns {Promise<User>}
   */
  byUser(id: string): Promise<PasswordRecovery | undefined>;
  byEmail(email: string): Promise<PasswordRecovery | undefined>;
  byToken(token: string): Promise<PasswordRecovery | undefined>;
  create(recovery: PasswordRecovery): Promise<PasswordRecovery>;
  deleteExpiredTokens(email: string): Promise<PasswordRecovery[]>
  //expireToken(recovery: PasswordRecovery, em?: any): Promise<PasswordRecovery>;
}
