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
    @inject(UserRepository)
    private userRepository: IUserRepository,
  ) {}
  public execute = async ({
    id,
    password,
    confirmPassword,
    oldPassword,
  }: changePasswordDTO): Promise<Either<AppError, User>> => {
    if (password !== confirmPassword)
      throw new Error(`As senhas não conferem.`);
    if (password === oldPassword)
      throw new Error(`Porfavor escolha um nova senha`);
    const user = await this.userRepository.byId(id);
    if (!user) throw new Error(`Esse funcionario não possui usuário.`);
    if (!User.DecryptPassword(oldPassword, user.password)) {
      throw new Error(`A senha antiga está invalida `);
    }
    user.password = await User.EncryptPassword(password);
    const updatedUser = await this.userRepository.updatePassword(user);
    return right(updatedUser);
  };
}
