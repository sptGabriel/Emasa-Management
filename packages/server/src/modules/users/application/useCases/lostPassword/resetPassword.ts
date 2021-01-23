import LoggerProvider from '@shared/adapters/models/LoggerProvider';
import QueueProvider from '@shared/adapters/models/QueueProvider';
import { IUseCase } from '@shared/core/useCase';
import { inject, injectable } from 'tsyringe';
import { UserRepository } from '@modules/users/persistence/userRepositoryImpl';
import { IUserRepository } from '@modules/users/persistence/userRepository';
import { resetPwdDTO } from './dto';
import { Either, right } from '@shared/core/either';
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
    device,
    ip,
    latitude,
    longitude,
    os,
  }: resetPwdDTO): Promise<any> {
    //if (password !== confirmPassword)
    //  throw new Error('Passwords do not match. Please try again.');
    //const user = await this.userRepository.byEmail(email);
    //if (!user) throw new Error(`This user doesn't exists`);
    //const old_password = user.password;
    //const hasRecovery = await PasswordRecovery.findOne({
    //  email,
    //  used: false
    //});
    //if (!hasRecovery)
    //  throw new Error(`Token has expired. Please try password reset again.`);
    //if (hasRecovery.token !== token) throw new Error(`Invalid Code`)
    //const encryptedPwd = await User.EncryptPassword(password);
    //wrap(user).assign({ password: encryptedPwd });
    //await PasswordRecovery.updateOne({
    //  email,
    //  token,
    //},
    //{
    //  $set: {
    //    used: true,
    //  },
    //});
    //await this.userRepository.updatePassword(user).then(() =>
    //  PasswordLogs.create({
    //    old_password,
    //    new_password: user.password,
    //    employee_id: user.employee.id,
    //    type: 'reset-password',
    //    ip,
    //    latitude,
    //    longitude,
    //    device,
    //    os,
    //  }),
    //);

    //return right({
    //  message: 'Password reset. Please login with your new password.',
    //});
  }
}
