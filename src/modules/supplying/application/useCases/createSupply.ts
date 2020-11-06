import { ProductRepository } from '@modules/products/persistence/productRepositoryImpl';
import { ISupplierRepository } from '@modules/supplier/persistence/supplierRepository';
import { SupplierRepository } from '@modules/supplier/persistence/supplierRepositoryImpl';
import { SuppliedProducts } from '@modules/supplying/domain/suppliedProducts.entity';
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
    private supplyingRepository: SupplyingRepository,
    @inject(ProductRepository)
    private productsRepository: ProductRepository,
  ) {}
  public execute = async (
    request: CreateSupplyDTO,
  ): Promise<Either<AppError, Supply>> => {
    const hasSupplier = await this.supplierRepository.byId(
      request.supply.supplier_id,
    );
    if (!hasSupplier) return left(new Error('Supplier dont Exists.'));
    const products_ids = request.suppliedProducts.map(product => {
      return product.product_id;
    });
    const hasProducts = await this.productsRepository.byArray(products_ids);
    if (hasProducts.length < 1) return left(new Error('Products dont Exists.'));
    if (hasProducts.length !== products_ids.length) {
      return left(new Error('tratar error.'));
    }
    const supply = Supply.build(request.supply);
    supply.suppliedProducts.set(
      request.suppliedProducts.map(supplied => {
        return SuppliedProducts.build({
          product: ensure(hasProducts.find((x) => x.id == supplied.product_id)),
          quantity: supplied.quantity,
          supply: supply,
        });
      }),
    );
    const provided = await this.supplyingRepository.create(supply);
    return right(provided);
  };
}
