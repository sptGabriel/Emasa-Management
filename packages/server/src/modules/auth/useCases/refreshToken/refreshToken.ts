import { Either, right } from '@shared/core/either';
import { IUseCase } from '@shared/core/useCase';
import { AppError } from '@shared/errors/BaseError';
import { inject, injectable } from 'tsyringe';
import { refreshTokenDTO } from './refreshTokenDTO';
import { UserRepository } from '@modules/users/persistence/userRepositoryImpl';
import { IUserRepository } from '@modules/users/persistence/userRepository';
import { JWT } from '@modules/users/domain/jwt';
import { promisifyDecode } from '@shared/helpers/jwt';
import { wrap } from '@mikro-orm/core';
import jwtConfig from '@config/jwt.config';
import { JsonWebTokenError, TokenExpiredError, verify } from 'jsonwebtoken';
import { User } from '@modules/users/domain/user.entity';
@injectable()
export class RefreshTokenUseCase
  implements IUseCase<refreshTokenDTO, Promise<Either<AppError, any>>> {
  constructor(
    @inject(UserRepository)
    private userRepository: IUserRepository,
  ) {}

  private async renewRefreshToken(rfToken: string, user: User) {
    console.log(rfToken === user.ref_token)
    if (user.ref_token !== null && rfToken !== user.ref_token)
      throw new Error(`Plase login again`);
    const token = await promisifyDecode(rfToken, jwtConfig.rfSecret);
    if (!(token instanceof Error) && token) return user;
    if (
      token instanceof JsonWebTokenError &&
      !(token instanceof TokenExpiredError)
    ) {
      throw new Error(`Invalid Refresh Token`);
    }
    if (user.employee.id !== token.id) throw new Error(`Invalid Refresh Token`);
    const renewToken = await JWT.buildRefreshToken(user.employee.id);
    wrap(user).assign({ ref_token: renewToken.token });
    return await this.userRepository.setRFToken(user);
  }

  public execute = async ({
    refreshToken,
    id
  }: refreshTokenDTO): Promise<Either<AppError, any>> => {
    if (!refreshToken) throw new Error(`Invalid credentials`);
    const decoded: any = await promisifyDecode(
      refreshToken,
      jwtConfig.rfSecret,
    );
    const user = await this.userRepository.byId(id);
    if (!user) throw new Error(`This user doesn't exists`);
    if (user.employee.id !== decoded.sub)
      throw new Error(`Invalid Credentials`);
    const renewRefreshToken = await this.renewRefreshToken(refreshToken, user);
    // const user = await this.validateUser({ id, ip });
    const renewAccessToken = JWT.buildAcessToken(
      { sub: user.employee.id },
      user.getJWTPayload,
    );
    return right({
      refreshToken: renewRefreshToken.ref_token,
      user_id: renewRefreshToken.employee.id,
      accessToken: renewAccessToken.token,
      message: 'Token refreshed successfully',
    });
  };
}
