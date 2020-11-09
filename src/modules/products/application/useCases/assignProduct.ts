import { ProductInstance } from '@modules/products/domain/productInstance.entity';
import { IProductCategoryRepository } from '@modules/products/persistence/productCategoryRepository';
import { ProductCategoryRepository } from '@modules/products/persistence/productCategoryRepositoryImpl';
import { IProductRepository } from '@modules/products/persistence/productRepository';
import { ProductRepository } from '@modules/products/persistence/productRepositoryImpl';
import { ISupplyingRepository } from '@modules/supplying/persistence/supplyingRepository';
import { SupplyingRepository } from '@modules/supplying/persistence/supplyingRepositoryImpl';
import { Either, left, right } from '@shared/core/either';
import { IUseCase } from '@shared/core/useCase';
import { AppError } from '@shared/errors/BaseError';
import { inject, injectable } from 'tsyringe';
import { AssignProductDTO } from '../dtos/assignProduct_DTO';
@injectable()
export class AssignProductUseCase
  implements
    IUseCase<AssignProductDTO, Promise<Either<AppError, ProductInstance>>> {
  constructor(
    @inject(SupplyingRepository)
    private supplyRepository: ISupplyingRepository,
    @inject(ProductCategoryRepository)
    private categoryRepository: IProductCategoryRepository,
    @inject(ProductRepository)
    private productRepository: IProductRepository,
  ) {}
  public execute = async ({
    contract_id,
    employee_id,
    parent_id,
    patrimony_code,
    product_id,
    serial_number,
    type,
  }: AssignProductDTO): Promise<Either<AppError, ProductInstance>> => {
    const hasSupply = await this.supplyRepository.byContract(contract_id);
    console.log(hasSupply)
  };
}
