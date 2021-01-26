import LoggerProvider from '@shared/adapters/models/LoggerProvider';
import QueueProvider from '@shared/adapters/models/QueueProvider';
import { IUseCase } from '@shared/core/useCase';
import { inject, injectable } from 'tsyringe';
import { UserRepository } from '@modules/users/persistence/userRepositoryImpl';
import { IUserRepository } from '@modules/users/persistence/userRepository';
import { forgotPwdDTO } from './dto';
import { Either, left, right } from '@shared/core/either';
import { randomBytes } from 'crypto';
import { AppError } from '@shared/errors/BaseError';
import { PasswordRecovery } from '@modules/users/domain/passwordRecovery.entity';
import { IPasswordRecoveryRepository } from '@modules/users/persistence/passwordRecoveryRepository';
import { PasswordRecoveryRepository } from '@modules/users/persistence/passwordRecoveryRepositoryImpl';

@injectable()
export class ForgotMessageService
  implements IUseCase<forgotPwdDTO, Promise<Either<AppError, any>>> {
  constructor(
    @inject(UserRepository) private userRepository: IUserRepository,
    @inject(PasswordRecoveryRepository)
    private passwordRecoveryRepository: IPasswordRecoveryRepository,
    @inject('QueueProvider') private queueProvider: QueueProvider,
    @inject('LoggerProvider') private loggerProvider: LoggerProvider,
  ) {}

  async invalidateExpiredRecoveries(email: string) {
    return await this.passwordRecoveryRepository.deleteExpiredTokens(email);
  }

  async execute({ email }: forgotPwdDTO): Promise<any> {
    const user = await this.userRepository.byEmail(email.toLowerCase());
    if (!user) return left({ user: false });
    if (!user.employee.email) return left({ email: false });
    await this.invalidateExpiredRecoveries(email);
    const hasRecovery = await this.passwordRecoveryRepository.byUser(
      user.employee.id,
    );
    const token = randomBytes(64).toString('base64');
    const expires_at = new Date(new Date().getTime() + 10 * 60000);
    const recovery =
      hasRecovery && hasRecovery.expires_at > new Date()
        ? hasRecovery
        : await this.passwordRecoveryRepository.create(PasswordRecovery.build({
            user: user,
            token,
            used: false,
            expires_at,
          }));
    await this.queueProvider.add({
      from: {
        name: 'Emasa',
        email: 'emasa@emasa',
      },
      to: user.employee.email,
      subject: 'Te enviamos o código de recuperação de senha',
      body: `codigo ${recovery.token}`,
    });
    return right({
      message: 'Te enviamos o código de recuperação de senha',
    });
  }
}
