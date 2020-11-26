import { Either, right } from '@shared/core/either';
import { IUseCase } from '@shared/core/useCase';
import { AppError } from '@shared/errors/BaseError';
import { inject, injectable } from 'tsyringe';
import { refreshTokenDTO } from './refreshTokenDTO';
import { UserRepository } from '@modules/users/persistence/userRepositoryImpl';
import { IUserRepository } from '@modules/users/persistence/userRepository';
import { User } from '@modules/users/domain/user.entity';
import { IJWTAcessPayload, JWT } from '@modules/users/domain/jwt';
import { isTokenNOTExpired } from '@shared/helpers/jwt';
import { wrap } from '@mikro-orm/core';
@injectable()
export class RefreshTokenUseCase
  implements IUseCase<refreshTokenDTO, Promise<Either<AppError, any>>> {
  constructor(
    @inject(UserRepository)
    private userRepository: IUserRepository,
  ) {}
  private validateUser = async (matricula:string) => {
    const user = await this.userRepository.byMatricula(matricula);
    if (!user) throw new Error(`User doesn't exists`);
    if(isTokenNOTExpired(user.ref_token)) return user;
    const renewToken = await JWT.buildRefreshToken(user.employee.matricula)
    wrap(user).assign({ref_token:renewToken.token})
    return await this.userRepository.setRFToken(user);
  };
  public execute = async ({
    accessToken,
    matricula,
  }: refreshTokenDTO): Promise<Either<AppError, {acessToken:string}>> => {
    if(isTokenNOTExpired(accessToken)) return right({acessToken:accessToken});
    const user = await this.validateUser(matricula);
    const renewAcessToken = JWT.buildAcessToken(
      { sub: user.employee.matricula },
      user.getJWTPayload(),
    );
    return right({acessToken:renewAcessToken.token})
  };
}
