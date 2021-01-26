import { Either, right } from '@shared/core/either';
import { IUseCase } from '@shared/core/useCase';
import { AppError } from '@shared/errors/BaseError';
import { inject, injectable } from 'tsyringe';
import { LogoutDTO } from './logoutDTO';
import { UserRepository } from '@modules/users/persistence/userRepositoryImpl';
import { IUserRepository } from '@modules/users/persistence/userRepository';
import { promisifyDecode } from '@shared/helpers/jwt';
import jwtConfig from '@config/jwt.config';
@injectable()
export class LogoutUseCase
  implements IUseCase<LogoutDTO, Promise<Either<AppError, any>>> {
  constructor(
    @inject(UserRepository)
    private userRepository: IUserRepository,
  ) {}
  public execute = async ({
    id,
    ip,
    refreshToken      
  }: LogoutDTO): Promise<Either<AppError, any>> => {
    if(!id || !refreshToken) throw new Error(`Invalid credentials`)
    const decoded:any = await promisifyDecode(refreshToken, jwtConfig.rfSecret);
    const user = await this.userRepository.byId(id);
    if (!user) throw new Error(`This user doesn't exists`);
    if(decoded.sub !== user.employee.id) throw new Error(`Invalid credentials`);
    await this.userRepository.logout(user, ip);
    // await this.userRepository.getClient().SADD('token', token);
    return right({ status: 200, data: 'You are logged out' });
  };
}
