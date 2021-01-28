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
import http from 'http';
import { AuthorizedUser } from '@modules/users/domain/authorizedUser.entity';
import { getReverse } from '@utils/getReverseGeoLocation';

var options = {
  host: 'https://api.bigdatacloud.net/data/reverse-geocode',
  port: 80,
  path: '/resource?id=foo&bar=baz',
  method: 'POST',
};

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
    const devices = user.authorizedDevices.getItems();
    const renewToken = await JWT.buildRefreshToken(user.employee.id);
    wrap(user).assign({ ref_token: renewToken.token });
    let { ip, latitude, longitude, timezone, device, os } = data;
    const hasDevice = devices.find(item => {
      if (item.os === os && item.ip === ip && item.device === device)
        return device;
    });
    const reverser: any = !hasDevice
      ? await getReverse({
          latitude,
          longitude,
        })
      : undefined;
    const userDevice = !hasDevice
      ? AuthorizedUser.build({
          ...reverser.data,
          device,
          country: reverser.data.countryName || null,
          city: reverser.data.city || reverser.data.locality || null,
          ip,
          latitude,
          longitude,
          online: true,
          os,
          timezone,
          user,
        })
      : undefined;
    return await this.userRepository.login(
      user,
      ensure(hasDevice ? hasDevice : userDevice),
      hasDevice ? true : false,
    );
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
