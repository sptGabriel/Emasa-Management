
import { ProductRepository } from '@modules/products/persistence/productRepositoryImpl';
import { ISupplierRepository } from '@modules/supplier/persistence/supplierRepository';
import { SupplierRepository } from '@modules/supplier/persistence/supplierRepositoryImpl';
import { SupplyingRepository } from '@modules/supplying/persistence/supplyingRepositoryImpl';
import { Either, left, right } from '@shared/core/either';
import { IUseCase } from '@shared/core/useCase';
import { AppError } from '@shared/errors/BaseError';
import { inject, injectable } from 'tsyringe';
import { Supplying } from '../../domain/supplying.entity';
import { CreateSupplyDTO } from '../dtos/createSupply_DTO';
@injectable()
export class CreateSupplyUseCase
  implements IUseCase<CreateSupplyDTO, Promise<Either<AppError, Supplying>>> {
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
  ): Promise<Either<AppError, Supplying>> => {
    const hasSupplier = await this.supplierRepository.byId(request.supplier_id);
    if (!hasSupplier) return left(new Error('Supplier dont Exists.'));
    const products_ids = suppliedProducts.map(product => product.id);
    const hasProducts = await this.productsRepository.findProductIDS(
      products_ids,
    );
    if (!hasProducts) return left(new Error('Products dont Exists.'));
    // const supply = this.supplyingRepository.create(Supplying.build());
    // return right(supply);
  };
}
