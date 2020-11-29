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
import instance from 'tsyringe/dist/typings/dependency-container';
@injectable()
export class RefreshTokenUseCase
  implements IUseCase<refreshTokenDTO, Promise<Either<AppError, any>>> {
  constructor(
    @inject(UserRepository)
    private userRepository: IUserRepository,
  ) {}

  private validateUser = async ({ id, ip }: refreshTokenDTO) => {
    const user = await this.userRepository.byId(id);
    if (!user) throw new Error(`User doesn't exists`);
    if (user.ip_address !== ip) {
      throw new Error(
        `It was not possible to generate an access and refresh token.`,
      );
    }
    const hasValidToken = user.ref_token
      ? await promisifyDecode(user.ref_token, jwtConfig.rfSecret)
      : false;
    const now = Date.now().valueOf() / 1000;
    if(hasValidToken.exp > now){
      const a = hasValidToken.exp - now.toUTCString();
    }
    if (!(hasValidToken instanceof Error) && hasValidToken) return user;
    if (
      hasValidToken instanceof JsonWebTokenError &&
      !(hasValidToken instanceof TokenExpiredError)
    ) {
      throw new Error(`Problem with Token, ${hasValidToken.message}`)
    }
    const renewToken = await JWT.buildRefreshToken(user.employee.id);
    wrap(user).assign({ ref_token: renewToken.token });
    return await this.userRepository.setRFToken(user);
  };
  public execute = async ({
    id,
    ip,
  }: refreshTokenDTO): Promise<Either<AppError, any>> => {
    const user = await this.validateUser({ id, ip });
    const renewAcessToken = JWT.buildAcessToken(
      { sub: user.employee.id },
      user.getJWTPayload,
    );
    return right({
      acessToken: renewAcessToken.token,
      message: 'Token refreshed successfully',
    });
  };
}
