import { RequestContext, wrap } from '@mikro-orm/core';
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
  private validateParent = async (parent_id: string) => {
    const parent = parent_id
      ? await this.categoryRepository.byId(parent_id)
      : null;
    if (parent === undefined) {
      throw new Error('Parent Category Dont Exists.');
    }
    return parent;
  };
  public execute = async ({
    name,
    parent_id,
  }: CreateProductCategoryDTO): Promise<Either<AppError, ProductCategory>> => {
    const hasCategory = await this.categoryRepository.byCategoryName(name);
    if (hasCategory) return left(new Error('Category Already Exists.'));
    const parent = parent_id ? await this.validateParent(parent_id) : null;
    const category = await this.categoryRepository.create(
      ProductCategory.build({ name, parent }),
    );
    return right(category);
  };
}
