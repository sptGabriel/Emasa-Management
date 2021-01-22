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
import { UserDevice } from '@modules/users/domain/authorized_devices.mongo';
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
  //validate acces
  private validateUserAccess = async (data: loginDTO) => {
    const user = await this.userRepository.byLogin(data.login);
    if (!user) throw new Error(`User not found`);
    if (!User.DecryptPassword(data.password, user.password)) {
      throw new Error(`Incorrect Password`);
    }
    const renewToken = await JWT.buildRefreshToken(user.employee.id);
    wrap(user).assign({ ref_token: renewToken.token });
    const { ip, latitude, longitude, timezone, device, os } = data;
    return await this.userRepository.login(user, {
      ip,
      latitude,
      longitude,
      timezone,
      device: device ? device : 'Desconhecido',
      os: os ? os : 'Desconhecido',
    });
  };

  public execute = async (
    login: loginDTO,
  ): Promise<Either<AppError, loginResult>> => {
    const user = await this.validateUserAccess(login);
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
