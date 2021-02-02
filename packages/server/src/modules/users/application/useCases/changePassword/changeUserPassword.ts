import jwtConfig from '@config/jwt.config';
import { IUserRepository } from '@modules/users/persistence/userRepository';
import { UserRepository } from '@modules/users/persistence/userRepositoryImpl';
import { Either, right } from '@shared/core/either';
import { IUseCase } from '@shared/core/useCase';
import { AppError } from '@shared/errors/BaseError';
import { promisifyDecode } from '@shared/helpers/jwt';
import { ensure } from '@utils/ensure';
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
    token
  }: changePasswordDTO): Promise<Either<AppError, User>> => {
    const decoded = await promisifyDecode(token, ensure(jwtConfig.secret));
    if (decoded.id !== id) throw new Error(`Invalid Request`);
    if (password !== confirmPassword)
      throw new Error(`As senhas não conferem.`);
    if (password === oldPassword)
      throw new Error(`Por favor escolha uma nova senha`);
    const user = await this.userRepository.byId(decoded.id);
    if (!user) throw new Error(`Esse funcionario não possui usuário.`);
    if (!User.DecryptPassword(oldPassword, user.password)) {
      throw new Error(`A senha antiga está invalida `);
    }
    user.password = await User.EncryptPassword(password);
    const updatedUser = await this.userRepository.updatePassword(user);
    return right(updatedUser);
  };
}
