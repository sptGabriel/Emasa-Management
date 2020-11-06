import { IProductCategoryRepository } from '@modules/products/persistence/productCategoryRepository';
import { ProductCategoryRepository } from '@modules/products/persistence/productCategoryRepositoryImpl';
import { IProductRepository } from '@modules/products/persistence/productRepository';
import { ProductRepository } from '@modules/products/persistence/productRepositoryImpl';
import { Either, left, right } from '@shared/core/either';
import { IUseCase } from '@shared/core/useCase';
import { AppError } from '@shared/errors/BaseError';
import { inject, injectable } from 'tsyringe';
import { Product } from '../../domain/product.entity';
import { CreateProductDTO } from '../dtos/createProduct_DTO';
@injectable()
export class CreateProductUseCase
  implements IUseCase<CreateProductDTO, Promise<Either<AppError, Product>>> {
  constructor(
    @inject(ProductCategoryRepository)
    private categoryRepository: IProductCategoryRepository,
    @inject(ProductRepository)
    private productRepository: IProductRepository,
  ) {}
  public execute = async (
    request: CreateProductDTO,
  ): Promise<Either<AppError, Product>> => {
    const hasCategory = await this.categoryRepository.byId(request.category_id);
    if (!hasCategory) return left(new Error('Category dont Exists.'));
    const hasProduct = await this.productRepository.byCodReference(
      request.cod_reference,
    );
    if (hasProduct) return left(new Error('Product Already Exists.'));
    const product = await this.productRepository.create(Product.build(request));
    return right(product);
  };
}
