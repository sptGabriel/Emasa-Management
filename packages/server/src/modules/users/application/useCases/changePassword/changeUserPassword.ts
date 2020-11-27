import { IEmployeeRepository } from '@modules/employees/persistence/employeeRepository';
import { EmployeeRepository } from '@modules/employees/persistence/employeeRepositoryImpl';
import { IUserRepository } from '@modules/users/persistence/userRepository';
import { UserRepository } from '@modules/users/persistence/userRepositoryImpl';
import { Either, right } from '@shared/core/either';
import { IUseCase } from '@shared/core/useCase';
import { AppError } from '@shared/errors/BaseError';
import { inject, injectable } from 'tsyringe';
import { User } from '../../../domain/user.entity';
import { changePasswordDTO } from './changeUserPassword_DTO';
@injectable()
export class ChangePasswordUseCase
  implements IUseCase<changePasswordDTO, Promise<Either<AppError, User>>> {
  constructor(
    @inject(EmployeeRepository)
    private employeeRepository: IEmployeeRepository,
    @inject(UserRepository)
    private userRepository: IUserRepository,
  ) {}
  public execute = async ({
    matricula,
    password,
    password_confirm,
    old_password,
  }: changePasswordDTO): Promise<Either<AppError, User>> => {
    if (password !== password_confirm) {
      throw new Error(
        `There is a problem with the password and password confirmation. Please check.`,
      );
    }
    if (password === old_password) {
      throw new Error(`Old and new Password is equals`);
    }
    const user = await this.userRepository.byMatricula(matricula);
    if (!user) throw new Error(`This employee doesn't have user.`);
    if (!User.DecryptPassword(old_password, user.password)) {
      throw new Error(`Old password is invalid `);
    }
    user.password = await User.EncryptPassword(password);
    const updatedUser = await this.userRepository.updatePassword(user);
    return right(updatedUser);
  };
}
