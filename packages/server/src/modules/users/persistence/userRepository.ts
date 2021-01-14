import { Employee } from '@modules/employees/domain/employee.entity';
import { Pagination } from '@shared/core/pagination';
import { User } from '../domain/user.entity';

export interface IUserRepository {
  /**
   * @param {Pagination} pagination
   * @returns {Promise<[Employee[] , number]>}
   */
  all(pagination: Pagination): Promise<User[]>;

  /**
   * @param {string} login
   * @returns {Promise<User>}
   */
  byLogin(login: string): Promise<User | undefined>;
  /**
   * @param {number} id
   * @returns {Promise<User>}
   */
  byId(id: string): Promise<User | undefined>;
  /**
   * @param {string} matricula
   * @returns {Promise<User>}
   */
  byMatricula(matricula: string): Promise<User | undefined>;
  /**
   * @param {string} employeeProps
   * @returns {Promise<User>}
   */
  create(user: User): Promise<User>;
    /**
   * @param {string} employeeProps
   * @returns {Promise<User>}
   */
  updatePassword(user: User): Promise<User>;
      /**
   * @param {string} employeeProps
   * @returns {Promise<User>}
   */
  updateLogin(user: User): Promise<User>;
    /**
   * @param {string} employeeProps
   * @returns {Promise<User>}
   */
  update(user: User): Promise<User>;
        /**
   * @param {string} employeeProps
   * @returns {Promise<User>}
   */
  setRFToken(user: User): Promise<User>;
  login(user: User, ip:string): Promise<User>;
  logout(user: User, ip:string): Promise<User>;
      /**
   * @param {string} employeeProps
   * @returns {Promise<User>}
   */
  changePictureProfile(user: User): Promise<User>;
}
