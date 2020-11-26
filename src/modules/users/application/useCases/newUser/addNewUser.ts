import { IDepartamentRepository } from '@modules/departaments/persistence/departamentRepository';
import { DepartamentRepository } from '@modules/departaments/persistence/departamentRepositoryImpl';
import { IEmployeeRepository } from '@modules/employees/persistence/employeeRepository';
import { EmployeeRepository } from '@modules/employees/persistence/employeeRepositoryImpl';
import { IUserRepository } from '@modules/users/persistence/userRepository';
import { UserRepository } from '@modules/users/persistence/userRepositoryImpl';
import { Either, left, right } from '@shared/core/either';
import { IUseCase } from '@shared/core/useCase';
import { AppError } from '@shared/errors/BaseError';
import { inject, injectable } from 'tsyringe';
import { User } from '../../../domain/user.entity';
import { newUserDTO } from './newUser_DTO';
@injectable()
export class NewUserUseCase
  implements IUseCase<newUserDTO, Promise<Either<AppError, User>>> {
  constructor(
    @inject(EmployeeRepository)
    private employeeRepository: IEmployeeRepository,
    @inject(DepartamentRepository)
    private departamentRepository: IDepartamentRepository,
    @inject(UserRepository)
    private userRepository: IUserRepository,
  ) {}
  public execute = async ({
    login,
    matricula,
    password,
    ip_address
  }: newUserDTO): Promise<Either<AppError, User>> => {
    const hasLogin = await this.userRepository.byLogin(login);
    if (hasLogin) throw new Error(`This login already exist`);
    const employee = await this.employeeRepository.byMatricula(matricula);
    if (!employee) throw new Error(`This employee doesn't exist`);
    const user = await this.userRepository.create(
      await User.build({ employee, login, password,ip_address  }),
    );
    return right(user);
  };
}
