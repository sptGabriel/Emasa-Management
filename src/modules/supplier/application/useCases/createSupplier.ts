
import { ISupplierRepository } from '@modules/supplier/persistence/supplierRepository';
import { SupplierRepository } from '@modules/supplier/persistence/supplierRepositoryImpl';
import { Either, left, right } from '@shared/core/either';
import { IUseCase } from '@shared/core/useCase';
import { AppError } from '@shared/errors/BaseError';
import { inject, injectable } from 'tsyringe';
import { Supplier } from '../../domain/supplier.entity';
import { CreateSupplierDTO } from '../dtos/createSupplier_DTO';
@injectable()
export class CreateSupplierUseCase
  implements IUseCase<CreateSupplierDTO, Promise<Either<AppError, Supplier>>> {
  constructor(
    @inject(SupplierRepository)
    private supplierRepository: ISupplierRepository,
  ) {}
  public execute = async (
    request: CreateSupplierDTO,
  ): Promise<Either<AppError, Supplier>> => {
    const supplierExists = await this.supplierRepository.byCNPJ(
      request.cnpj,
    );
    if (supplierExists) return left(new Error('Supplier Already Exists.'));
    const supplier = await this.supplierRepository.create(Supplier.build(request));
    return right(supplier);
  };
}
