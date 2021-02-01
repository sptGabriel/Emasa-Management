import jwtConfig from '@config/jwt.config';
import { wrap } from '@mikro-orm/core';
import { IUserRepository } from '@modules/users/persistence/userRepository';
import { UserRepository } from '@modules/users/persistence/userRepositoryImpl';
import { Either, right } from '@shared/core/either';
import { IUseCase } from '@shared/core/useCase';
import { AppError } from '@shared/errors/BaseError';
import { promisifyDecode } from '@shared/helpers/jwt';
import { ensure } from '@utils/ensure';
import { inject, injectable } from 'tsyringe';
import { User } from '../../../domain/user.entity';
import { editProfiledDTO } from './editProfile_DTO';
@injectable()
export class EditProfileUseCase
  implements IUseCase<editProfiledDTO, Promise<Either<AppError, User>>> {
  constructor(
    @inject(UserRepository)
    private userRepository: IUserRepository,
  ) {}
  public execute = async ({
    biografia,
    email,
    nome,
    sobreNome,
    userName,
    id,
    token,
  }: editProfiledDTO): Promise<Either<AppError, User>> => {
    const user = await this.userRepository.byId(id);
    if (!user) throw new Error(`This user doesn't exists`);
    const decoded = await promisifyDecode(token, ensure(jwtConfig.secret));
    if (decoded.id !== user.employee.id) throw new Error(`Invalid Request`);
    if (biografia && biografia !== user.employee.biografia) {
      wrap(user.employee).assign({biografia});
    }
    if (email && email !== user.employee.email) {
      wrap(user.employee).assign({email});
    }
    if (nome && nome !== user.employee.first_name) {
      wrap(user.employee).assign({ first_name: nome });
    }
    if (sobreNome && sobreNome !== user.employee.last_name) {
      wrap(user.employee).assign({ last_name: sobreNome });
    }
    if (userName && userName !== user.login) {
      wrap(user).assign({ login: userName });
    }
    const updatedUser = await this.userRepository.update(user);
    return right(updatedUser);
  };
}
