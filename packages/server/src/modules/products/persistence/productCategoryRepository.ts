import { Pagination } from '@shared/core/pagination';
import { ProductCategory } from '../domain/productCategory.entity';

export interface IProductCategoryRepository {
    /**
     * @param {Pagination} pagination
     * @returns {Promise<[ProductCategory[] , number]>}
     */
    all(pagination: Pagination): Promise<ProductCategory[]>;

    /**
     * @param {number} id
     * @returns {Promise<ProductCategory>}
     */
    byId(id: string): Promise<ProductCategory | undefined>;

    /**
     * @param {string} CNPJ
     * @returns {Promise<ProductCategory>}
     */
    byCategoryName(name: string): Promise<ProductCategory | undefined>;
        /**
     * @param {string} productCategory
     * @returns {Promise<ProductCategory>}
     */
    create(productCategory: ProductCategory): Promise<ProductCategory>;
}