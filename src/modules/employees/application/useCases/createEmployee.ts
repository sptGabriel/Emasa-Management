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
  public execute = async ({
    position,
    last_name,
    first_name,
    matricula,
    departament_id,
  }: CreateEmployeeDTO): Promise<Either<AppError, Employee>> => {
    if (!(position in Positions)) throw new Error('Invalid position');
    const hasEmployee = await this.employeeRepository.byMatricula(matricula);
    if (hasEmployee) left(new Error(`${matricula} already exists`));
    const departament = await this.departamentRepository.byId(departament_id);
    if (!departament) throw new Error(`Departament  dont exists`);
    const employee = await this.employeeRepository.create(
      Employee.build({
        matricula,
        first_name,
        last_name,
        position,
        departament,
      }),
    );
    return right(employee);
  };
}
