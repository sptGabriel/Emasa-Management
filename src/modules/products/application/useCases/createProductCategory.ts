import { ISupplierRepository } from '@modules/supplier/persistence/supplierRepository';
import { SupplierRepository } from '@modules/supplier/persistence/supplierRepositoryImpl';
import { Either, left, right } from '@shared/core/either';
import { IUseCase } from '@shared/core/useCase';
import { AppError } from '@shared/errors/BaseError';
import { inject, injectable } from 'tsyringe';
import { ProductCategory } from '../../domain/productCategory.entity';
import { CreateProductCategoryDTO } from '../dtos/createProductCategory_DTO';
@injectable()
export class CreateSupplierUseCase
  implements
    IUseCase<
      CreateProductCategoryDTO,
      Promise<Either<AppError, ProductCategory>>
    > {
  constructor(
    @inject(SupplierRepository)
    private supplierRepository: ISupplierRepository,
  ) {}
  public execute = async (
    request: CreateProductCategoryDTO,
  ): Promise<Either<AppError, ProductCategory>> => {
    const supplierExists = await this.supplierRepository.byCNPJ(request.cnpj);
    if (supplierExists) return left(new Error('Supplier Already Exists.'));
    const supplier = await this.supplierRepository.create(
      Supplier.build(request),
    );
    return right(supplier);
  };
}
