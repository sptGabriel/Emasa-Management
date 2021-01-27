import { Either, right } from '@shared/core/either';
import { IUseCase } from '@shared/core/useCase';
import { AppError } from '@shared/errors/BaseError';
import { inject, injectable } from 'tsyringe';
import { loginDTO } from './loginDTO';
import { UserRepository } from '@modules/users/persistence/userRepositoryImpl';
import { IUserRepository } from '@modules/users/persistence/userRepository';
import { IJWTAcessPayload, JWT } from '@modules/users/domain/jwt';
import { wrap } from '@mikro-orm/core';
import { ensure } from '@utils/ensure';
import { User } from '@modules/users/domain/user.entity';

import {AuthorizedUser} from '@modules/users/domain/authorizedUser.entity';

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
    const userDevice = AuthorizedUser.build({
      device,
      ip,
      latitude,
      longitude,
      online: true,
      os,
      timezone,
      user,
    });
    return await this.userRepository.login(user, userDevice);
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
