import { Pagination } from '@shared/core/pagination';
import { Supplying } from '../domain/supplying.entity';

export interface ISupplyingRepository {
    /**
     * @param {Pagination} pagination
     * @returns {Promise<[Supplying[] , number]>}
     */
    all(pagination: Pagination): Promise<Supplying[]>;

    /**
     * @param {number} id
     * @returns {Promise<Supplying>}
     */
    byId(id: string): Promise<Supplying | undefined>;
        /**
     * @param {string} supplyingProps
     * @returns {Promise<Supplying>}
     */
    create(supplying: any): Promise<Supplying>;
}