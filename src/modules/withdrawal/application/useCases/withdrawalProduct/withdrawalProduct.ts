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
import { Withdrawal } from '@modules/withdrawal/domain/withdrawal.entity';
import { WithdrawalComponents } from '@modules/withdrawal/domain/withdrawalComponents.entity';
import { IWithdrawalRepository } from '@modules/withdrawal/persistence/withdrawalRepository';
import { WithdrawalRepository } from '@modules/withdrawal/persistence/withdrawalRepositoryImpl';
import { Either, right } from '@shared/core/either';
import { IUseCase } from '@shared/core/useCase';
import { AppError } from '@shared/errors/BaseError';
import { inject, injectable } from 'tsyringe';
import { WithdrawalComponentDTO } from './withdrawalProduct_DTO';
@injectable()
export class WithdrawalComponentUseCase
  implements
    IUseCase<
      WithdrawalComponentDTO,
      Promise<Either<AppError, WithdrawalComponents>>
    > {
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
    @inject(WithdrawalRepository)
    private withdrawalRepository: IWithdrawalRepository,
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
    if (!hasProduct) throw new Error(`This product doesn't exist`)
    return hasProduct;
  };
  private validateEmployeeOwner = async (
    matricula: string,
    departament_id: string,
  ) => {
    const employee = await this.employeeRepository.byMatricula(matricula);
    if (!employee) {
      throw new Error(`The employee who would receive the component 
      doesn't exist`);
    }
    if (employee.departament.id !== departament_id) {
      throw new Error(
        `The Employee does not belong to the component department`,
      );
    }
    return employee;
  };
  private validateDepartament = async (departament_id: string) => {
    const departament = await this.departamentRepository.byId(departament_id);
    if (!departament) throw new Error(`Departament doesn't exist.`);
    return departament;
  };
  private validateComponent = async (sn: string) => {
    const validate = await this.productInstanceRepository.bySN2(sn);
    if (!validate) return;
    if (validate) throw new Error(`This component has already been assigned.`);
  };

  public execute = async ({
    contract_id,
    product_id,
    departament_id,
    serial_number,
    by_employee,
    to_employee,
  }: WithdrawalComponentDTO): Promise<Either<AppError, WithdrawalComponents>> => {
    // if (!(type in ProductTypes)) throw new Error(`${type}, is invalid`);
    //verify employees
    //verify if already exists instance
    await this.validateComponent(serial_number);
    //verify departament
    const departament = await this.validateDepartament(departament_id);
    //validate receiver employee
    const toEmployee = await this.validateEmployeeOwner(
      to_employee,
      departament_id,
    );
    //validate supplier employee
    const byEmployee = await this.employeeRepository.byMatricula(by_employee);
    if (!byEmployee) {
      throw new Error(`The employee responsible for supply does not exist`);
    }
    //verify if component has already been assigned
    const hasWithdrawal = await this.withdrawalRepository.bySN(serial_number);
    if (hasWithdrawal) throw new Error(`Component has already been assigned`);
    //verify product
    const product = await this.validateProduct(product_id);
    //validate stock
    const stock = await this.validateStock(contract_id, product_id);
    // create component
    const componentDomain = ComponentInstance.build({
      product,
      serial_number,
      stock_id:stock.id,
      departament,
    });
    //create withdrawal
    const withdrawalDomain = Withdrawal.build({
      to_employee:toEmployee.id,
      by_employee:byEmployee.id,
      to_departament: departament.id,
    });
    const withdrawalProductsDomain = WithdrawalComponents.build(
      withdrawalDomain,
      componentDomain,
    );
    //verify type
    const withdrawalProducts = await this.withdrawalRepository.withdrawalProduct(
      withdrawalProductsDomain,
    );
    return right(withdrawalProducts);
  };
}
