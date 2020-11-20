import { IDepartamentRepository } from '@modules/departaments/persistence/departamentRepository';
import { DepartamentRepository } from '@modules/departaments/persistence/departamentRepositoryImpl';
import { IEmployeeRepository } from '@modules/employees/persistence/employeeRepository';
import { EmployeeRepository } from '@modules/employees/persistence/employeeRepositoryImpl';
import { ComponentInstance } from '@modules/products/domain/componentInstance.entity';
import { IComponentInstanceRepository } from '@modules/products/persistence/instanceRepository';
import { ComponentInstanceRepository } from '@modules/products/persistence/instanceRepositoryImpl';
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
    IUseCase<AssignProductDTO, Promise<Either<AppError, ComponentInstance>>> {
  constructor(
    @inject(EmployeeRepository)
    private employeeRepository: IEmployeeRepository,
    @inject(DepartamentRepository)
    private departamentRepository: IDepartamentRepository,
    @inject(ProductRepository)
    private productRepository: IProductRepository,
    @inject(ComponentInstanceRepository)
    private productInstanceRepository: IComponentInstanceRepository,
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
    const parentInstance = await this.productInstanceRepository.bySN(
      patrimony_code,
    );
    if (parentInstance) return parentInstance;
    throw new Error(`Parent Product doesn't exist.`);
  };
  private validateDepartament = async (departament_id: string) => {
    const departament = await this.departamentRepository.byId(departament_id);
    if (!departament) throw new Error(`Departament doesn't exist.`);
    return departament;
  };
  public execute = async ({
    contract_id,
    product_id,
    departament_id,
    serial_number,
    by_employee,
    to_employee,
  }: AssignProductDTO): Promise<Either<AppError, ComponentInstance>> => {
    // if (!(type in ProductTypes)) throw new Error(`${type}, is invalid`);
    //verify departament
    const departament = await this.validateDepartament(departament_id);
    //verify product
    const product = await this.validateProduct(product_id);
    //verify if already exists instance
    const hasInstance = await this.productInstanceRepository.bySN(
      serial_number,
    );
    if (hasInstance) throw new Error(`instance already exists`);
    //validate stock
    const stock = await this.validateStock(contract_id, product_id);
    //verify type
    const component = await this.productInstanceRepository.create(
      ComponentInstance.build({
        product,
        serial_number,
        stock,
        departament,
      }),
    );

    return right(component);
  };
}
