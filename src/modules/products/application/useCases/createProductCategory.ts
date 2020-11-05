import { ProductCategoryRepository } from '@modules/products/persistence/productCategoryRepositoryImpl';
import { Either, left, right } from '@shared/core/either';
import { IUseCase } from '@shared/core/useCase';
import { AppError } from '@shared/errors/BaseError';
import { inject, injectable } from 'tsyringe';
import { ProductCategory } from '../../domain/productCategory.entity';
import { CreateProductCategoryDTO } from '../dtos/createProductCategory_DTO';
@injectable()
export class CreateProductCategoryUseCase
  implements
    IUseCase<
      CreateProductCategoryDTO,
      Promise<Either<AppError, ProductCategory>>
    > {
  constructor(
    @inject(ProductCategoryRepository)
    private categoryRepository: ProductCategoryRepository,
  ) {}
  public execute = async (
    request: CreateProductCategoryDTO,
  ): Promise<Either<AppError, ProductCategory>> => {
    const hasCategory = await this.categoryRepository.byCategoryName(request.name);
    if (hasCategory) return left(new Error('Category Already Exists.'));
    const category = await this.categoryRepository.create(
      ProductCategory.build(request),
    );
    return right(category);
  };
}
