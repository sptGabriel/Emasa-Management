import { IEmployeeRepository } from '@modules/employees/persistence/employeeRepository';
import { EmployeeRepository } from '@modules/employees/persistence/employeeRepositoryImpl';
import {
  ProductInstance,
  ProductTypes,
} from '@modules/products/domain/productInstance.entity';
import { IProductInstanceRepository } from '@modules/products/persistence/instanceRepository';
import { ProductInstanceRepository } from '@modules/products/persistence/instanceRepositoryImpl';
import { IProductRepository } from '@modules/products/persistence/productRepository';
import { ProductRepository } from '@modules/products/persistence/productRepositoryImpl';
import { IProductStocksRepository } from '@modules/products/persistence/productStocksRepository';
import { ProductStocksRepository } from '@modules/products/persistence/productStocksRepositoryImpl';
import { Either, right } from '@shared/core/either';
import { IUseCase } from '@shared/core/useCase';
import { AppError } from '@shared/errors/BaseError';
import { inject, injectable } from 'tsyringe';
import { AssignProductDTO } from '../dtos/assignProduct_DTO';
@injectable()
export class AssignProductUseCase
  implements
    IUseCase<AssignProductDTO, Promise<Either<AppError, ProductInstance>>> {
  constructor(
    @inject(EmployeeRepository)
    private employeeRepository: IEmployeeRepository,
    @inject(ProductRepository)
    private productRepository: IProductRepository,
    @inject(ProductInstanceRepository)
    private instanceRepository: IProductInstanceRepository,
    @inject(ProductStocksRepository)
    private stockRepository: IProductStocksRepository,
  ) {}
  public execute = async ({
    contract_id,
    matricula,
    parent_id,
    patrimony_code,
    product_id,
    serial_number,
    type,
  }: AssignProductDTO): Promise<Either<AppError, ProductInstance>> => {
    //verify type
    if (!(type in ProductTypes)) throw new Error(`${type}, is invalid`);
    //instance checks
    const hasInstance = await this.instanceRepository.bySN(serial_number);
    if (hasInstance) {
      throw new Error(
        `This ${serial_number} product has already been assigned `,
      );
    }
    const parentInstance = parent_id
      ? await this.instanceRepository.byId(parent_id)
      : null;
    if (parentInstance === undefined) {
      throw new Error(`Parent Instance doesn't exist.`);
    }
    //products checks
    const hasProduct = await this.productRepository.byId(product_id);
    if (!hasProduct) throw new Error(`This product doesn't exist.`);
    //employee checks
    const hasEmployee = await this.employeeRepository.byMatricula(matricula);
    if (!hasEmployee) throw new Error(`This Employee doesn't exist.`);
    const employeeHasProduct = await this.instanceRepository.hasInstance(
      product_id,
      hasEmployee.id,
    );
    if (employeeHasProduct) {
      throw new Error(
        `The enrollment employee: ${matricula} already has an instance of the product.`,
      );
    }
    //stock checks
    const stock = await this.stockRepository.byContractAndProduct(
      contract_id,
      product_id,
    );
    if (!stock) {
      throw new Error(
        `The product has no stock, or the contract has no supply.`,
      );
    }
    if (stock.quantity <= 1) {
      throw new Error(`The stock of this product is less than or equal to 1`);
    }
    //create instance
    const instance = await this.instanceRepository.create(ProductInstance.build(request))
    return right(instance)
  };
}
