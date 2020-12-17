import { Either, right } from '@shared/core/either';
import { IUseCase } from '@shared/core/useCase';
import { AppError } from '@shared/errors/BaseError';
import { inject, injectable } from 'tsyringe';
import { loginDTO } from './loginDTO';
import { UserRepository } from '@modules/users/persistence/userRepositoryImpl';
import { IUserRepository } from '@modules/users/persistence/userRepository';
import { IJWTAcessPayload, JWT } from '@modules/users/domain/jwt';
import { promisifyDecode } from '@shared/helpers/jwt';
import { wrap } from '@mikro-orm/core';
import { ensure } from '@utils/ensure';
import jwtConfig from '@config/jwt.config';
import { User } from '@modules/users/domain/user.entity';
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
  //setAllowedIPV4
  //garantAccessTK
  private validateUser = async ({ login, password }: loginDTO) => {
    const user = await this.userRepository.byLogin(login);
    if (!user) throw new Error(`User doesn't exists`);
    const hasValidToken = user.ref_token
      ? await promisifyDecode(user.ref_token, jwtConfig.rfSecret)
      : false;
    if (!(hasValidToken instanceof Error) && hasValidToken) return user;
    const renewToken = await JWT.buildRefreshToken(user.employee.id);
    wrap(user).assign({ ref_token: renewToken.token, active: true });
    return await this.userRepository.setRFToken(user);
  };
  //validate acces
  private validateUserAccess = async ({ip,login,password}: loginDTO) => {
    const user = await this.userRepository.byLogin(login);
    if (!user) throw new Error(`User doesn't exists`);
    if (!User.DecryptPassword(password, user.password)) {
      throw new Error(`Incorrect Password`);
    }
    //const hasValidToken = user.ref_token
    //? await promisifyDecode(user.ref_token, jwtConfig.rfSecret)
    //: false;
    //if (!(hasValidToken instanceof Error) && hasValidToken) return user;
    const renewToken = await JWT.buildRefreshToken(user.employee.id);
    wrap(user).assign({ ref_token: renewToken.token });
    return await this.userRepository.login(user, ip);
  };
  public execute = async ({
    login,
    password,
    ip,
  }: loginDTO): Promise<Either<AppError, loginResult>> => {
    const user = await this.validateUserAccess({ login, password, ip });
    const accessToken = JWT.buildAcessToken(
      { sub: user.employee.id },
      user.getJWTPayload,
    );
    return right({
      refresh: ensure(user.ref_token),
      access: accessToken.token,
      user: user.getJWTPayload,
    });
  };
}
