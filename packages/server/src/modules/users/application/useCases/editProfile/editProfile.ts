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
    if (biografia) wrap(user).assign({ employee: { biografia } });
    console.log('biografia');
    if (email) wrap(user).assign({ employee: { email } });
    console.log('email');
    if (nome) wrap(user).assign({ employee: { first_name: nome } });
    console.log('nome');
    if (sobreNome) wrap(user).assign({ employee: { last_name: sobreNome } });
    console.log('sobrenome');
    if (userName) wrap(user).assign({ login: userName });
    console.log('username');
    const updatedUser = await this.userRepository.update(user);
    return right(updatedUser);
  };
}
