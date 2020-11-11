import { IEmployeeRepository } from '@modules/employees/persistence/employeeRepository';
import { EmployeeRepository } from '@modules/employees/persistence/employeeRepositoryImpl';
import { ProductInstance } from '@modules/products/domain/productInstance.entity';
import { IProductCategoryRepository } from '@modules/products/persistence/productCategoryRepository';
import { ProductCategoryRepository } from '@modules/products/persistence/productCategoryRepositoryImpl';
import { IProductRepository } from '@modules/products/persistence/productRepository';
import { ProductRepository } from '@modules/products/persistence/productRepositoryImpl';
import { IProductStocksRepository } from '@modules/products/persistence/productStocksRepository';
import { ProductStocksRepository } from '@modules/products/persistence/productStocksRepositoryImpl';
import { ISupplyingRepository } from '@modules/supplying/persistence/supplyingRepository';
import { SupplyingRepository } from '@modules/supplying/persistence/supplyingRepositoryImpl';
import { Either } from '@shared/core/either';
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
    @inject(SupplyingRepository)
    private supplyRepository: ISupplyingRepository,
    @inject(ProductCategoryRepository)
    private categoryRepository: IProductCategoryRepository,
    @inject(ProductRepository)
    private productRepository: IProductRepository,
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
    const hasEmployee = await this.employeeRepository.byMatricula(matricula);
    const hasStock = await this.stockRepository.byContractAndProduct(
      contract_id,
      product_id,
    );
    console.log(hasStock, 'stock');
    console.log(hasEmployee, 'employee');
    // const hasSupply = await this.supplyRepository.byContract(contract_id);
    // console.log(hasSupply);
  };
}
