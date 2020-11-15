import { IProductCategoryRepository } from '@modules/products/persistence/productCategoryRepository';
import { ProductCategoryRepository } from '@modules/products/persistence/productCategoryRepositoryImpl';
import { IProductRepository } from '@modules/products/persistence/productRepository';
import { ProductRepository } from '@modules/products/persistence/productRepositoryImpl';
import { Either, left, right } from '@shared/core/either';
import { IUseCase } from '@shared/core/useCase';
import { AppError } from '@shared/errors/BaseError';
import { inject, injectable } from 'tsyringe';
import { Product } from '@modules/products/domain/product.entity';
import { CreateProductDTO } from './createProduct_DTO';
@injectable()
export class CreateProductUseCase
  implements IUseCase<CreateProductDTO, Promise<Either<AppError, Product>>> {
  constructor(
    @inject(ProductCategoryRepository)
    private categoryRepository: IProductCategoryRepository,
    @inject(ProductRepository)
    private productRepository: IProductRepository,
  ) {}
  public execute = async ({
    category_id,
    cod_reference,
    current_price,
    has_instances,
    name,
  }: CreateProductDTO): Promise<Either<AppError, Product>> => {
    if (typeof current_price !== 'number') {
      return left(new Error('invalid current_price dont Exists.'));
    }
    if (typeof has_instances !== 'boolean') {
      return left(new Error('invalid has_instace dont Exists.'));
    }
    const category = await this.categoryRepository.byId(category_id);
    if (!category) return left(new Error('Category dont Exists.'));
    const hasProduct = await this.productRepository.byCodReference(
      cod_reference,
    );
    if (hasProduct) return left(new Error('Product Already Exists.'));
    const product = await this.productRepository.create(
      Product.build({
        category,
        cod_reference,
        has_instances,
        name,
        current_price,
      }),
    );
    return right(product);
  };
}
