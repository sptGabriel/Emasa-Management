import { Pagination } from '@shared/core/pagination';
import { SuppliedProducts } from '../domain/suppliedProducts.entity';

export interface ISuppliedProductsRepository {
    /**
     * @param {Pagination} pagination
     * @returns {Promise<[Supplier[] , number]>}
     */
    all(pagination: Pagination): Promise<SuppliedProducts[]>;

    /**
     * @param {number} id
     * @returns {Promise<Supplier>}
     */
    byId(id: string): Promise<SuppliedProducts | undefined>;

        /**
     * @param {string} supplierProps
     * @returns {Promise<Employee>}
     */
    create(suppliedProducts: SuppliedProducts): Promise<SuppliedProducts>;
}