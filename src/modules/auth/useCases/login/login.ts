import { Either, right } from '@shared/core/either';
import { IUseCase } from '@shared/core/useCase';
import { AppError } from '@shared/errors/BaseError';
import { inject, injectable } from 'tsyringe';
import { loginDTO } from './loginDTO';
import { UserRepository } from '@modules/users/persistence/userRepositoryImpl';
import { IUserRepository } from '@modules/users/persistence/userRepository';
import { User } from '@modules/users/domain/user.entity';
import { IJWTAcessPayload, JWT } from '@modules/users/domain/jwt';
import { isTokenNOTExpired } from '@shared/helpers/jwt';
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
  }: {
    login: string;
    password: string;
  }) => {
    const user = await this.userRepository.byLogin(login);
    if (!user) throw new Error(`User doesn't exists`);
    const isValidPW = User.DecryptPassword(password, user.password);
    if (!isValidPW) throw new Error(`Invalid Password`);
    return user;
  };
  public execute = async ({
    login,
    password,
  }: loginDTO): Promise<Either<AppError, loginResult>> => {
    const user = await this.validateUser({ login, password });
    const acessToken = JWT.buildAcessToken(
      { sub: user.employee.matricula },
      user.getJWTPayload(),
    );
    const rfTokenHasExpired = isTokenNOTExpired(user.ref_token);
    if (!rfTokenHasExpired) throw new Error(`Invalid Token`);
    return right({
      refresh: user.ref_token,
      access: acessToken.token,
      user: user.getJWTPayload(),
    });
  };
}
