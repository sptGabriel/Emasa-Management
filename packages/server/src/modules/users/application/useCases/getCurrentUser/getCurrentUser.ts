import { IUserRepository } from '@modules/users/persistence/userRepository';
import { UserRepository } from '@modules/users/persistence/userRepositoryImpl';
import { Either, right } from '@shared/core/either';
import { IUseCase } from '@shared/core/useCase';
import { AppError } from '@shared/errors/BaseError';
import { promisifyDecode } from '@shared/helpers/jwt';
import { inject, injectable } from 'tsyringe';
import { User } from '../../../domain/user.entity';
import { currentUserDTO } from './currentUserDTO';
import jwtConfig from '@config/jwt.config';
import { decode } from 'jsonwebtoken';
@injectable()
export class getCurrentUserCase
  implements IUseCase<currentUserDTO, Promise<Either<AppError, User>>> {
  constructor(
    @inject(UserRepository)
    private userRepository: IUserRepository,
  ) {}
  public execute = async ({
    ip,accessToken
  }: currentUserDTO): Promise<Either<AppError, User>> => {
    const decoded = await promisifyDecode(accessToken,jwtConfig.secret)
    if(decoded instanceof Error) throw decoded;
    const user = await this.userRepository.byId(decoded.id);
    if (!user) throw new Error(`This user doesn't exist`);
    if(ip !== user.ip_address) throw new Error(`Invalid User IP Addres`)
    return right(user);
  };
}
