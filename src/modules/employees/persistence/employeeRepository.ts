import { Pagination } from '@shared/core/pagination';
import { Employee } from '../domain/employee.entity';

export interface IEmployeeRepository {
    /**
     * @param {Pagination} pagination
     * @returns {Promise<[Employee[] , number]>}
     */
    all(pagination: Pagination): Promise<Employee[]>;

    /**
     * @param {number} id
     * @returns {Promise<Employee>}
     */
    byId(id: string): Promise<Employee | undefined>;

    /**
     * @param {string} matricula
     * @returns {Promise<Employee>}
     */
    byMatricula(matricula: string): Promise<Employee | undefined>;
        /**
     * @param {string} employeeProps
     * @returns {Promise<Employee>}
     */
    create(departament: Employee): Promise<Employee>;
}