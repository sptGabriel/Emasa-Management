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
import { PasswordRecoveryRepository } from '@modules/users/persistence/passwordRecoveryRepositoryImpl';
import { IPasswordRecoveryRepository } from '@modules/users/persistence/passwordRecoveryRepository';
import {
  Device,
  LOGTYPE,
  OS,
  PasswordLogs,
} from '@modules/users/domain/passwordLogs.entity';
import { enumFromValue } from '@utils/enumFromValue';

@injectable()
export class ResetPasswordService
  implements IUseCase<resetPwdDTO, Promise<Either<AppError, any>>> {
  constructor(
    @inject(UserRepository) private userRepository: IUserRepository,
    @inject(PasswordRecoveryRepository)
    private passwordRecoveryRepository: IPasswordRecoveryRepository,
    @inject('QueueProvider') private queueProvider: QueueProvider,
    @inject('LoggerProvider') private loggerProvider: LoggerProvider,
  ) {}

  async execute({
    confirmPassword,
    password,
    token,
    device,
    ip,
    latitude,
    longitude,
    os,
  }: resetPwdDTO): Promise<any> {
    if (password !== confirmPassword)
      throw new Error('Passwords do not match. Please try again.');
    const recovery = await this.passwordRecoveryRepository.byToken(token);
    if (!recovery)
      throw new Error(`Request a recovery code again, token has expired`);
    const old_password = recovery.user.password;
    const encryptedPwd = await User.EncryptPassword(password);
    wrap(recovery.user).assign({ password: encryptedPwd });
    const passwordLogs = PasswordLogs.build({
      device: enumFromValue(device, Device),
      user: recovery.user,
      ip,
      latitude,
      longitude,
      new_password: encryptedPwd,
      old_password,
      os: enumFromValue(os, OS),
      type: LOGTYPE.resetpwd,
    });
    await this.userRepository.resetPassword(recovery, passwordLogs);
    return right({
      message: 'Password reset. Please login with your new password.',
    });
  }
}
