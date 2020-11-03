import { Pagination } from '@shared/core/pagination';
import { Departament } from '../domain/departament.entity';


export interface IDepartamentRepository {
    /**
     * @param {Pagination} pagination
     * @returns {Promise<[Departament[] , number]>}
     */
    all(pagination: Pagination): Promise<Departament[]>;

    /**
     * @param {number} id
     * @returns {Promise<User>}
     */
    byId(id: string): Promise<Departament | undefined>;

    /**
     * @param {string} departament_name
     * @returns {Promise<Departament>}
     */
    byName(departament_name: string): Promise<Departament | undefined>;
        /**
     * @param {string} departamentProps
     * @returns {Promise<Departament>}
     */
    create(departament: Departament): Promise<Departament>;
}