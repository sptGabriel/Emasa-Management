import { Either, right } from '@shared/core/either';
import { IUseCase } from '@shared/core/useCase';
import { AppError } from '@shared/errors/BaseError';
import { inject, injectable } from 'tsyringe';
import { LogoutDTO } from './logoutDTO';
import { UserRepository } from '@modules/users/persistence/userRepositoryImpl';
import { IUserRepository } from '@modules/users/persistence/userRepository';
import { wrap } from '@mikro-orm/core';
import { JWT } from '@modules/users/domain/jwt';
@injectable()
export class LogoutUseCase
  implements IUseCase<LogoutDTO, Promise<Either<AppError, any>>> {
  constructor(
    @inject(UserRepository)
    private userRepository: IUserRepository,
  ) {}
  public execute = async ({
    matricula,
  }: LogoutDTO): Promise<Either<AppError, any>> => {
    const user = await this.userRepository.byMatricula(matricula);
    if (!user) throw new Error(`This user doesn't exists`);
    if (user.ref_token === null) {
      throw new Error(`This user is already logged out`);
    }
    wrap(user).assign({ ref_token: null });
    await this.userRepository.setRFToken(user);
    // await this.userRepository.getClient().SADD('token', token);
    return right({ status: 200, data: 'You are logged out' });
  };
}
