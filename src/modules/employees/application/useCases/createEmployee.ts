import { IDepartamentRepository } from '@modules/departaments/persistence/departamentRepository';
import { DepartamentRepository } from '@modules/departaments/persistence/departamentRepositoryImpl';
import { IEmployeeRepository } from '@modules/employees/persistence/employeeRepository';
import { EmployeeRepository } from '@modules/employees/persistence/employeeRepositoryImpl';
import { Either, left, right } from '@shared/core/either';
import { IUseCase } from '@shared/core/useCase';
import { AppError } from '@shared/errors/BaseError';
import { inject, injectable } from 'tsyringe';
import { Employee, Positions } from '../../domain/employee.entity';
import { CreateEmployeeDTO } from '../dtos/createEmployee_DTO';
@injectable()
export class CreateEmployeeUseCase
  implements IUseCase<CreateEmployeeDTO, Promise<Either<AppError, Employee>>> {
  constructor(
    @inject(EmployeeRepository)
    private employeeRepository: IEmployeeRepository,
    @inject(DepartamentRepository)
    private departamentRepository: IDepartamentRepository,
  ) {}
  public execute = async (
    request: CreateEmployeeDTO,
  ): Promise<Either<AppError, Employee>> => {
    if (!(request.position in Positions)) throw new Error('Invalid position');
    const hasEmployee = await this.employeeRepository.byMatricula(
      request.matricula,
    );
    if (hasEmployee) {
      return left(new Error(`${request.matricula} already exists`));
    }
    const hasDepartament = await this.departamentRepository.byId(
      request.departament_id,
    );
    if (!hasDepartament) {
      return left(
        new Error(`Departament with: ${request.departament_id} dont exists`),
      );
    }
    const employee = await this.employeeRepository.create(
      Employee.build(request),
    );
    return right(employee);
  };
}
