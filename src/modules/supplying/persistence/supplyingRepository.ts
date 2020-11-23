import { ProductStocks } from '@modules/products/domain/stock.entity';
import { Pagination } from '@shared/core/pagination';
import { addStock } from '../application/useCases/newSupply/createSupply_DTO';
import { SuppliedProducts } from '../domain/suppliedProducts.entity';
import { Supply } from '../domain/supplying.entity';

export interface ISupplyingRepository {
  /**
   * @param {Pagination} pagination
   * @returns {Promise<[Supplying[] , number]>}
   */
  all(pagination: Pagination): Promise<Supply[]>;

  /**
   * @param {number} id
   * @returns {Promise<Supplying>}
   */
  byId(id: string): Promise<Supply | undefined>;
  /**
   * @param {string} supplyingProps
   * @returns {Promise<Supplying>}
   */
  create(supplying: Supply, stock: ProductStocks[]): Promise<Supply>;

  byContract(contract_id: string): Promise<Supply | undefined>;
}
