import { IDepartamentRepository } from '@modules/departaments/persistence/departamentRepository';
import { DepartamentRepository } from '@modules/departaments/persistence/departamentRepositoryImpl';
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
import { AssignProductDTO } from './assignProduct_DTO';
@injectable()
export class AssignProductUseCase
  implements
    IUseCase<AssignProductDTO, Promise<Either<AppError, ProductInstance>>> {
  constructor(
    @inject(EmployeeRepository)
    private employeeRepository: IEmployeeRepository,
    @inject(DepartamentRepository)
    private departamentRepository: IDepartamentRepository,
    @inject(ProductRepository)
    private productRepository: IProductRepository,
    @inject(ProductInstanceRepository)
    private instanceRepository: IProductInstanceRepository,
    @inject(ProductStocksRepository)
    private stockRepository: IProductStocksRepository,
  ) {}
  private validateStock = async (contract_id: string, product_id: string) => {
    const stock = await this.stockRepository.byContractAndProduct(
      contract_id,
      product_id,
    );
    if (stock && stock.quantity > 1) return stock;
    if (stock && stock.quantity <= 1) {
      throw new Error(`The stock of this product is less than or equal to 1`);
    }
    throw new Error(`This stock doesn't exists`);
  };
  private validateProduct = async (product_id: string) => {
    const hasProduct = await this.productRepository.byId(product_id);
    if (!hasProduct) throw new Error(`This product doesn't exist.`);
    return hasProduct;
  };
  private validateEmployee = async (matricula: string) => {
    const hasEmployee = await this.employeeRepository.byMatricula(matricula);
    if (!hasEmployee) throw new Error(`This Employee doesn't exist.`);
    return hasEmployee;
  };
  private validateProductInstance = async (patrimony_code: string | null) => {
    if (!patrimony_code) return null;
    const parentInstance = await this.instanceRepository.bySN(patrimony_code);
    if (parentInstance) return parentInstance;
    throw new Error(`Parent Product doesn't exist.`);
  };
  private validateDepartament = async (
    depart_id: string | null,
    type: ProductTypes,
  ) => {
    if (depart_id === null || type === ProductTypes['component']) return null;
    const departament = await this.departamentRepository.byId(depart_id);
    if (!departament) throw new Error(`Parent Product doesn't exist.`);
    return departament;
  };

  //   public execute = async ({
  //   contract_id,
  //   matricula,
  //   patrimony_parent,
  //   patrimony_code,
  //   product_id,
  //   departament_id,
  //   serial_number,
  //   type,
  // }: AssignProductDTO & { type: ProductTypes }): Promise<
  //   Either<AppError, ProductInstance>
  // > => {
  //   // if (!(type in ProductTypes)) throw new Error(`${type}, is invalid`);
  //   //verify employee

  //   return right(productInstance);
  // };

  public execute = async ({
    contract_id,
    matricula,
    patrimony_parent,
    patrimony_code,
    product_id,
    departament_id,
    serial_number,
    type,
  }: AssignProductDTO & { type: ProductTypes }): Promise<
    Either<AppError, ProductInstance>
  > => {
    // if (!(type in ProductTypes)) throw new Error(`${type}, is invalid`);
    //verify employee
    const employee = await this.validateEmployee(matricula);
    //verify departament
    const departament = await this.validateDepartament(departament_id, type);
    //verify product
    const product = await this.validateProduct(product_id);
    //verify if already exists instance
    const hasInstance = await this.instanceRepository.bySN(serial_number);

    //validate parent product instance
    const parent = await this.validateProductInstance(patrimony_parent);
    //validate stock
    const stock = await this.validateStock(contract_id, product_id);
    //verify type
    const productInstance = await this.instanceRepository.create(
      ProductInstance.build({
        employee,
        product,
        serial_number,
        stock,
        type,
        parent,
        patrimony_code,
        departament,
      }),
    );
    return right(productInstance);
  };
}
