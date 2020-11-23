import { IDepartamentRepository } from '@modules/departaments/persistence/departamentRepository';
import { DepartamentRepository } from '@modules/departaments/persistence/departamentRepositoryImpl';
import { IEmployeeRepository } from '@modules/employees/persistence/employeeRepository';
import { EmployeeRepository } from '@modules/employees/persistence/employeeRepositoryImpl';
import { User } from '@modules/users/domain/user.entity';
import { IUserRepository } from '@modules/users/persistence/userRepository';
import { UserRepository } from '@modules/users/persistence/userRepositoryImpl';
import { Either, left, right } from '@shared/core/either';
import { IUseCase } from '@shared/core/useCase';
import { AppError } from '@shared/errors/BaseError';
import { inject, injectable } from 'tsyringe';
import { Employee, Positions } from '../../../domain/employee.entity';
import { employeeUser, NewEmployeeDTO } from './newEmployee_DTO';
@injectable()
export class NewEmployeeUseCase
  implements IUseCase<NewEmployeeDTO, Promise<Either<AppError, Employee>>> {
  constructor(
    @inject(EmployeeRepository)
    private employeeRepository: IEmployeeRepository,
    @inject(UserRepository)
    private userRepository: IUserRepository,
    @inject(DepartamentRepository)
    private departamentRepository: IDepartamentRepository,
  ) {}
  private validateLogin = async ({ login, password }: employeeUser) => {
    const hasLogin = await this.userRepository.byLogin(login);
    if (hasLogin) throw new Error(`Login: ${login} already exist`);
  };
  public execute = async ({
    position,
    last_name,
    first_name,
    matricula,
    departament_id,
    user_credentials,
  }: NewEmployeeDTO): Promise<Either<AppError, Employee>> => {
    if (!(position in Positions)) throw new Error('Invalid position');
    const hasEmployee = await this.employeeRepository.byMatricula(matricula);
    if (hasEmployee) {
      return left(
        new Error(`Employee with matricula: ${matricula} already exists`),
      );
    }
    if (user_credentials) await this.validateLogin(user_credentials);
    const departament = await this.departamentRepository.byId(departament_id);
    const employee = await this.employeeRepository.create(
      await Employee.build({
        matricula,
        first_name,
        last_name,
        position,
        departament,
        userProps: user_credentials ? user_credentials : undefined,
      }),
    );
    return right(employee);
  };
}
