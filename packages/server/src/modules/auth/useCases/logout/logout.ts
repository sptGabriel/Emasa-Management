import { Either, left, right } from '@shared/core/either';
import { IUseCase } from '@shared/core/useCase';
import { AppError } from '@shared/errors/BaseError';
import { inject, injectable } from 'tsyringe';
import { LogoutDTO } from './logoutDTO';
import { UserRepository } from '@modules/users/persistence/userRepositoryImpl';
import { IUserRepository } from '@modules/users/persistence/userRepository';
import { promisifyDecode } from '@shared/helpers/jwt';
import jwtConfig from '@config/jwt.config';
import { ensure } from '@utils/ensure';

@injectable()
export class LogoutUseCase
  implements IUseCase<LogoutDTO, Promise<Either<AppError, any>>> {
  constructor(
    @inject(UserRepository)
    private userRepository: IUserRepository,
  ) {}
  public execute = async ({
    id,
    ip,
    refreshToken,
  }: LogoutDTO): Promise<Either<AppError, any>> => {
    if (!id || !refreshToken) return right({ status: 'Credenciais invalidas' });
    const decoded: any = await promisifyDecode(
      refreshToken,
      ensure(jwtConfig.rfSecret),
    );
    const user = await this.userRepository.byId(id);
    if (!user) return right({ status: 'ok' });
    if (decoded.sub !== user.employee.id)
      return right({ status: 'Credenciais invalidas' });
    await this.userRepository
      .logout(user, ip)
      .catch(err => right({ status: 'err' }));
    return right({ status: 200, data: 'You are logged out' });
  };
}
