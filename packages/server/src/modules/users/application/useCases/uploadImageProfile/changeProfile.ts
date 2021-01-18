import { wrap } from '@mikro-orm/core';
import { IDepartamentRepository } from '@modules/departaments/persistence/departamentRepository';
import { DepartamentRepository } from '@modules/departaments/persistence/departamentRepositoryImpl';
import { IEmployeeRepository } from '@modules/employees/persistence/employeeRepository';
import { EmployeeRepository } from '@modules/employees/persistence/employeeRepositoryImpl';
import { ProfilePicture } from '@modules/users/domain/userProfilePicture.entity';
import { IUserRepository } from '@modules/users/persistence/userRepository';
import { UserRepository } from '@modules/users/persistence/userRepositoryImpl';
import { Either, left, right } from '@shared/core/either';
import { IUseCase } from '@shared/core/useCase';
import { AppError } from '@shared/errors/BaseError';
import { inject, injectable } from 'tsyringe';
import { User } from '../../../domain/user.entity';
import { userProfileIMG } from './changeProfile_DTO';
@injectable()
export class ChangeProfile
  implements IUseCase<userProfileIMG, Promise<Either<AppError, User>>> {
  constructor(
    @inject(EmployeeRepository)
    private employeeRepository: IEmployeeRepository,
    @inject(DepartamentRepository)
    private departamentRepository: IDepartamentRepository,
    @inject(UserRepository)
    private userRepository: IUserRepository,
  ) {}
  public execute = async ({
    id,
    ip,
    url,
    public_id,
    bytes,
  }: userProfileIMG): Promise<Either<AppError, User>> => {
    const user = await this.userRepository.byId(id);
    if (!user) throw new Error("This user doesn't exists");
    const picture = ProfilePicture.build({
      picture_id: public_id.split('/')[1],
      bytes,
      url,
    });
    wrap(user).assign({ picture });
    const updatedProfile = await this.userRepository.changePictureProfile(user);
    return right(updatedProfile);
  };
}
