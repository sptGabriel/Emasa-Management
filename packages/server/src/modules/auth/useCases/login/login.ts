import { Either, right } from '@shared/core/either';
import { IUseCase } from '@shared/core/useCase';
import { AppError } from '@shared/errors/BaseError';
import { inject, injectable } from 'tsyringe';
import { loginDTO } from './loginDTO';
import { UserRepository } from '@modules/users/persistence/userRepositoryImpl';
import { IUserRepository } from '@modules/users/persistence/userRepository';
import { User } from '@modules/users/domain/user.entity';
import { IJWTAcessPayload, JWT } from '@modules/users/domain/jwt';
import { decode, isTokenNOTExpired, promisifyDecode } from '@shared/helpers/jwt';
import { wrap } from '@mikro-orm/core';
import { ensure } from '@utils/ensure';
import jwtConfig from '@config/jwt.config';
export interface loginResult {
  refresh: string;
  access: string;
  user: IJWTAcessPayload;
}
@injectable()
export class LoginUseCase
  implements IUseCase<loginDTO, Promise<Either<AppError, any>>> {
  constructor(
    @inject(UserRepository)
    private userRepository: IUserRepository,
  ) {}
  private validateUser = async ({
    login,
    password,
    recent_ip
  }: loginDTO) => {
    const user = await this.userRepository.byLogin(login);
    if (!user) throw new Error(`User doesn't exists`);
    if(user.ip_address !== recent_ip){ 
      throw new Error(`Please check your email to grant access again.`)
    }
    const hasValidToken = user.ref_token
      ? await promisifyDecode(user.ref_token, jwtConfig.rfSecret)
      : false;
    if (!(hasValidToken instanceof Error) && hasValidToken) return user;
    const renewToken = await JWT.buildRefreshToken(user.employee.id);
    wrap(user).assign({ ref_token: renewToken.token });
    return await this.userRepository.setRFToken(user);
  };
  
  public execute = async ({
    login,
    password,
    recent_ip
  }: loginDTO): Promise<Either<AppError, loginResult>> => {
    const user = await this.validateUser({ login, password, recent_ip });
    const acessToken = JWT.buildAcessToken(
      { sub: user.employee.matricula },
      user.getJWTPayload,
    );
    return right({
      refresh: ensure(user.ref_token),
      access: acessToken.token,
      user: user.getJWTPayload,
    });
  };
}
