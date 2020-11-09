import { IContractRepository } from '@modules/contracts/persistence/contractRepository';
import { ContractRepository } from '@modules/contracts/persistence/contractRepositoryImpl';
import { ProductStocks } from '@modules/products/domain/stock.entity';
import { IProductRepository } from '@modules/products/persistence/productRepository';
import { ProductRepository } from '@modules/products/persistence/productRepositoryImpl';
import { ISupplierRepository } from '@modules/supplier/persistence/supplierRepository';
import { SupplierRepository } from '@modules/supplier/persistence/supplierRepositoryImpl';
import { SuppliedProducts } from '@modules/supplying/domain/suppliedProducts.entity';
import { ISupplyingRepository } from '@modules/supplying/persistence/supplyingRepository';
import { SupplyingRepository } from '@modules/supplying/persistence/supplyingRepositoryImpl';
import { Either, left, right } from '@shared/core/either';
import { IUseCase } from '@shared/core/useCase';
import { AppError } from '@shared/errors/BaseError';
import { ensure } from '@utils/ensure';
import { inject, injectable } from 'tsyringe';
import { Supply } from '../../domain/supplying.entity';
import { CreateSupplyDTO, supplyingProducts } from '../dtos/createSupply_DTO';
@injectable()
export class CreateSupplyUseCase
  implements IUseCase<CreateSupplyDTO, Promise<Either<AppError, Supply>>> {
  constructor(
    @inject(SupplierRepository)
    private supplierRepository: ISupplierRepository,
    @inject(SupplyingRepository)
    private supplyingRepository: ISupplyingRepository,
    @inject(ProductRepository)
    private productsRepository: IProductRepository,
    @inject(ContractRepository)
    private contractsRepository: IContractRepository,
  ) {}
  private validateProducts = async (suppliedProducts: supplyingProducts[]) => {
    const ids = suppliedProducts.map(supplied => supplied.product_id);
    const hasProducts = await this.productsRepository.byArray(ids)
    if (hasProducts.length !== ids.length)  throw new Error('tratar error.');
    return hasProducts
  };
  public execute = async ({
    supply,
    suppliedProducts,
  }: CreateSupplyDTO): Promise<Either<AppError, Supply>> => {
    const hasContract = await this.contractsRepository.byId(supply.contract_id);
    if (!hasContract) return left(new Error('Contract dont Exists.'));
    const hasSupplier = await this.supplierRepository.byId(supply.supplier_id);
    if (!hasSupplier) return left(new Error('Supplier dont Exists.'));
    const alreadySupplied = await this.supplyingRepository.byContract(
      supply.contract_id,
    );
    if (alreadySupplied) {
      return left(
        new Error(`${supply.contract_id}, already has supply of products`),
      );
    }
    const hasProducts = await this.validateProducts(suppliedProducts);
    const supplyResult = Supply.build(supply, hasContract);
    supplyResult.suppliedProducts.set(
      suppliedProducts.map(supplied => {
        return SuppliedProducts.build({
          product: ensure(hasProducts.find(x => x.id == supplied.product_id)),
          quantity: supplied.quantity,
          supply: supplyResult,
          unit_price: supplied.unit_price
        });
      }),
    );
    const stock = supplyResult.suppliedProducts.getItems().map((supplied) => {
      return ProductStocks.build({
        quantity: supplied.quantity,
        supply: supplied.supply,
        product: supplied.product,
    })})
    const provided = await this.supplyingRepository.create(supplyResult,stock);
    return right(provided);
  };
}
