import { Pagination } from '@shared/core/pagination';
import { Supplier } from '../domain/supplier.entity';

export interface ISupplierRepository {
    /**
     * @param {Pagination} pagination
     * @returns {Promise<[Supplier[] , number]>}
     */
    all(pagination: Pagination): Promise<Supplier[]>;

    /**
     * @param {number} id
     * @returns {Promise<Supplier>}
     */
    byId(id: string): Promise<Supplier | undefined>;

    /**
     * @param {string} CNPJ
     * @returns {Promise<Supplier>}
     */
    byCNPJ(cnpj: string): Promise<Supplier | undefined>;
        /**
     * @param {string} supplierProps
     * @returns {Promise<Employee>}
     */
    create(supplier: Supplier): Promise<Supplier>;
}