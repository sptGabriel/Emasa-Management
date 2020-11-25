import { Either, right } from '@shared/core/either';
import { IUseCase } from '@shared/core/useCase';
import { AppError } from '@shared/errors/BaseError';
import { inject, injectable } from 'tsyringe';
import { IBootstrap } from '@shared/infra/bootstrap';
import { IRedis } from '@shared/infra/redis';
import { LogoutDTO } from './logoutDTO';
@injectable()
export class LogoutUseCase
  implements IUseCase<LogoutDTO, Promise<Either<AppError, any>>> {
  private redisServer: IRedis;
  constructor(@inject('bootstrap') bootstrap: IBootstrap) {
    this.redisServer = bootstrap.getRedisServer();
  }
  public execute = async ({
    token,
  }: LogoutDTO): Promise<Either<AppError, any>> => {
    await this.redisServer.getClient().SADD('token', token);
    return right({ status: 200, data: 'You are logged out' });
  };
}
