import { Either, right } from '@shared/core/either';
import { IUseCase } from '@shared/core/useCase';
import { AppError } from '@shared/errors/BaseError';
import { inject, injectable } from 'tsyringe';
import { refreshTokenDTO } from './refreshTokenDTO';
import { UserRepository } from '@modules/users/persistence/userRepositoryImpl';
import { IUserRepository } from '@modules/users/persistence/userRepository';
import { JWT } from '@modules/users/domain/jwt';
import { isValidOrExpiredToken, promisifyDecode } from '@shared/helpers/jwt';
import { wrap } from '@mikro-orm/core';
import jwtConfig from '@config/jwt.config';
import { JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken';
import { User } from '@modules/users/domain/user.entity';
@injectable()
export class RefreshTokenUseCase
  implements IUseCase<refreshTokenDTO, Promise<Either<AppError, any>>> {
  constructor(
    @inject(UserRepository)
    private userRepository: IUserRepository,
  ) {}

  // private validateUser = async ({ id, ip }: refreshTokenDTO) => {
  //   const user = await this.userRepository.byId(id);
  //   if (!user) throw new Error(`User doesn't exists`);
  //   if (user.ip_address !== ip) {
  //     throw new Error(
  //       `It was not possible to generate an access and refresh token.`,
  //     );
  //   }
  //   const hasValidToken = user.ref_token
  //     ? await promisifyDecode(user.ref_token, jwtConfig.rfSecret)
  //     : false;
  //   const now = Date.now().valueOf() / 1000;
  //   if (hasValidToken.exp > now) {
  //     const a = hasValidToken.exp - now.toUTCString();
  //   }
  //   if (!(hasValidToken instanceof Error) && hasValidToken) return user;
  //   if (
  //     hasValidToken instanceof JsonWebTokenError &&
  //     !(hasValidToken instanceof TokenExpiredError)
  //   ) {
  //     throw new Error(`Problem with Token, ${hasValidToken.message}`);
  //   }
  //   const renewToken = await JWT.buildRefreshToken(user.employee.id);
  //   wrap(user).assign({ ref_token: renewToken.token });
  //   return await this.userRepository.setRFToken(user);
  // };
  private async renewRefreshToken(rfToken: string, user: User) {
    if (rfToken !== user.ref_token) throw new Error(`Plase login again`);
    const token = await promisifyDecode(rfToken, jwtConfig.rfSecret);
    if (!(token instanceof Error) && token) return user;
    if (
      token instanceof JsonWebTokenError &&
      !(token instanceof TokenExpiredError)
    ) {
      throw new Error(`Invalid Refresh Token`);
    }
    if(user.employee.id !== token.id) throw new Error(`Invalid Refresh Token`);
    const renewToken = await JWT.buildRefreshToken(user.employee.id);
    wrap(user).assign({ ref_token: renewToken.token });
    return await this.userRepository.setRFToken(user);
  }

  public execute = async ({
    id,
    ip,
    refreshToken,
  }: refreshTokenDTO): Promise<Either<AppError, any>> => {
    console.log('refresh token')
    const user = await this.userRepository.byId(id);
    if (!user) throw new Error(`This user doesn't exists`);
    if(user.ip_address !== ip) throw new Error(`Invalid Address`)
    const renewRefreshToken = await this.renewRefreshToken(refreshToken, user);
    // const user = await this.validateUser({ id, ip });
    const renewAcessToken = JWT.buildAcessToken(
      { sub: user.employee.id },
      user.getJWTPayload,
    );
    return right({
      refreshToken: renewRefreshToken.ref_token,
      acessToken: renewAcessToken.token,
      message: 'Token refreshed successfully',
    });
  };
}
