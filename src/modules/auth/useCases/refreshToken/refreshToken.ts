import { Either, right } from '@shared/core/either';
import { IUseCase } from '@shared/core/useCase';
import { AppError } from '@shared/errors/BaseError';
import { inject, injectable } from 'tsyringe';
import { refreshTokenDTO } from './refreshTokenDTO';
import { UserRepository } from '@modules/users/persistence/userRepositoryImpl';
import { IUserRepository } from '@modules/users/persistence/userRepository';
import { JWT } from '@modules/users/domain/jwt';
import {
  decode,
  isTokenNOTExpired,
  promisifyDecode,
} from '@shared/helpers/jwt';
import { wrap } from '@mikro-orm/core';
import jwtConfig from '@config/jwt.config';
import { JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken';
@injectable()
export class RefreshTokenUseCase
  implements IUseCase<refreshTokenDTO, Promise<Either<AppError, any>>> {
  constructor(
    @inject(UserRepository)
    private userRepository: IUserRepository,
  ) {}

  private validateUser = async (matricula: string) => {
    const user = await this.userRepository.byMatricula(matricula);
    if (!user) throw new Error(`User doesn't exists`);
    const hasValidToken = user.ref_token
      ? await promisifyDecode(user.ref_token, jwtConfig.rfSecret)
      : false;
    if (!(hasValidToken instanceof Error) && hasValidToken) return user;
    const renewToken = await JWT.buildRefreshToken(user.employee.matricula);
    wrap(user).assign({ ref_token: renewToken.token });
    return await this.userRepository.setRFToken(user);
  };
  public execute = async ({
    accessToken,
    matricula,
  }: refreshTokenDTO): Promise<Either<AppError, any>> => {
    const user = await this.validateUser(matricula);
    const renewAcessToken = JWT.buildAcessToken(
      { sub: user.employee.matricula },
      user.getJWTPayload,
    );
    return right({
      acessToken: renewAcessToken.token,
      message: 'Token refreshed successfully',
    });
  };
}
