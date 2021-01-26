import { wrap } from '@mikro-orm/core';
import { IEmployeeRepository } from '@modules/employees/persistence/employeeRepository';
import { EmployeeRepository } from '@modules/employees/persistence/employeeRepositoryImpl';
import { IUserRepository } from '@modules/users/persistence/userRepository';
import { UserRepository } from '@modules/users/persistence/userRepositoryImpl';
import { Either, right } from '@shared/core/either';
import { IUseCase } from '@shared/core/useCase';
import { AppError } from '@shared/errors/BaseError';
import { inject, injectable } from 'tsyringe';
import { User } from '../../../domain/user.entity';
import { changeLoginDTO } from './changeLogin_DTO';
@injectable()
export class ChangeLoginUseCase
  implements IUseCase<changeLoginDTO, Promise<Either<AppError, User>>> {
  constructor(
    @inject(EmployeeRepository)
    private employeeRepository: IEmployeeRepository,
    @inject(UserRepository)
    private userRepository: IUserRepository,
  ) {}
  public execute = async ({
    matricula,login
  }: changeLoginDTO): Promise<Either<AppError, User>> => {
    const user = await this.userRepository.byMatricula(matricula);
    if(!user) throw new Error(`This employee doesn't have user.`)
    wrap(user).assign({login})
    const updatedUser = await this.userRepository.updateLogin(user)
    return right(updatedUser);
  };
}
