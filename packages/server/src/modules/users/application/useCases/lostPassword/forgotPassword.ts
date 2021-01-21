import LoggerProvider from '@shared/adapters/models/LoggerProvider';
import QueueProvider from '@shared/adapters/models/QueueProvider';
import { IUseCase } from '@shared/core/useCase';
import { inject, injectable } from 'tsyringe';
import { PasswordRecovery } from '@modules/users/domain/passwordRecovery.mongo';
import { UserRepository } from '@modules/users/persistence/userRepositoryImpl';
import { IUserRepository } from '@modules/users/persistence/userRepository';
import { forgotPwdDTO } from './dto';
import { Either, left, right } from '@shared/core/either';
import { randomBytes } from 'crypto';
import { AppError } from '@shared/errors/BaseError';

@injectable()
export class ForgotMessageService
  implements IUseCase<forgotPwdDTO, Promise<Either<AppError, any>>> {
  constructor(
    @inject(UserRepository) private userRepository: IUserRepository,
    @inject('QueueProvider') private queueProvider: QueueProvider,
    @inject('LoggerProvider') private loggerProvider: LoggerProvider,
  ) {}

  async execute({ email }: forgotPwdDTO): Promise<any> {
    const user = await this.userRepository.byEmail(email);
    if (!user) return left({ user: false });
    if (!user.employee.email) return left({ email: false });
    const hasRecovery = await PasswordRecovery.findOne({
      email,
      used: false,
    });
    //Create a random reset token
    const token = hasRecovery
      ? hasRecovery.token
      : randomBytes(64).toString('base64');
    if (!hasRecovery) {
      await PasswordRecovery.create({
        email: email,
        token,
        used: false,
        employee_id: user.employee.id,
      });
    }
    return await this.queueProvider
      .add({
        from: {
          name: 'Emasa',
          email: 'emasa@emasa',
        },
        to: user.employee.email,
        subject: 'Te enviamos o código de recuperação de senha',
        body: `codigo ${token}`,
      })
      .then(() => {
        return right({
          message: 'Te enviamos o código de recuperação de senha',
        });
      });
  }
}
