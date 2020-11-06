import { IContractRepository } from '@modules/contracts/persistence/contractRepository';
import { ContractRepository } from '@modules/contracts/persistence/contractRepositoryImpl';
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
import { CreateSupplyDTO } from '../dtos/createSupply_DTO';
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
  public execute = async ({
    supply,
    suppliedProducts,
  }: CreateSupplyDTO): Promise<Either<AppError, Supply>> => {
    const hasContract = await this.contractsRepository.byId(supply.contract_id);
    if (!hasContract) return left(new Error('Contract dont Exists.'));
    const hasSupplier = await this.supplierRepository.byId(supply.supplier_id);
    if (!hasSupplier) return left(new Error('Supplier dont Exists.'));
    const products_ids = suppliedProducts.map(product => {
      return product.product_id;
    });
    const hasProducts = await this.productsRepository.byArray(products_ids);
    if (hasProducts.length < 1) return left(new Error('Products dont Exists.'));
    if (hasProducts.length !== products_ids.length) {
      return left(new Error('tratar error.'));
    }
    const supplyResult = Supply.build(supply, hasContract);
    supplyResult.suppliedProducts.set(
      suppliedProducts.map(supplied => {
        return SuppliedProducts.build({
          product: ensure(hasProducts.find(x => x.id == supplied.product_id)),
          quantity: supplied.quantity,
          supply: supplyResult,
        });
      }),
    );
    const provided = await this.supplyingRepository.create(supplyResult);
    return right(provided);
  };
}
