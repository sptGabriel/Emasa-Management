import LoggerProvider from '@shared/adapters/models/LoggerProvider';
import QueueProvider from '@shared/adapters/models/QueueProvider';
import { IUseCase } from '@shared/core/useCase';
import { inject, injectable } from 'tsyringe';
import PasswordRecovery, {
  PasswordRecoveryDocument,
} from '@modules/users/domain/passwordRecovery.mongo';
import { UserRepository } from '@modules/users/persistence/userRepositoryImpl';
import { IUserRepository } from '@modules/users/persistence/userRepository';
import { forgotPwdDTO, resetPwdDTO } from './dto';
import { Either, left, right } from '@shared/core/either';
import { randomBytes } from 'crypto';
import { AppError } from '@shared/errors/BaseError';
import { User } from '@modules/users/domain/user.entity';
import { wrap } from '@mikro-orm/core';

@injectable()
export class ResetPasswordService
  implements IUseCase<resetPwdDTO, Promise<Either<AppError, any>>> {
  constructor(
    @inject(UserRepository) private userRepository: IUserRepository,
    @inject('QueueProvider') private queueProvider: QueueProvider,
    @inject('LoggerProvider') private loggerProvider: LoggerProvider,
  ) {}

  async execute({
    email,
    confirmPassword,
    password,
    token,
  }: resetPwdDTO): Promise<any> {
    if (password !== confirmPassword)
      throw new Error('Passwords do not match. Please try again.');
    const user = await this.userRepository.byEmail(email);
    if (!user) throw new Error(`This user doesn't exists`);
    const hasRecovery = await PasswordRecovery.findOne({
      where: {
        email: email,
        token: token,
        used: false,
      },
    });
    if (!hasRecovery)
      throw new Error(`Token has expired. Please try password reset again.`);
    await PasswordRecovery.updateOne(
      {
        used: true,
      },
      {
        where: {
          email: email,
          token: token,
        },
      },
    );
    const encryptedPwd = await User.EncryptPassword(password);
    wrap(user).assign({ password: encryptedPwd });
    return await this.userRepository
      .updatePassword(user)
      .then(() =>
        right({
          message: 'Password reset. Please login with your new password.',
        }),
      );
  }
}
