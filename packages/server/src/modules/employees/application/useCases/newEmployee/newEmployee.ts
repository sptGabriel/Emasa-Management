import { IDepartamentRepository } from '@modules/departaments/persistence/departamentRepository';
import { DepartamentRepository } from '@modules/departaments/persistence/departamentRepositoryImpl';
import { Location } from '@modules/employees/domain/Location.entity';
import { IEmployeeRepository } from '@modules/employees/persistence/employeeRepository';
import { EmployeeRepository } from '@modules/employees/persistence/employeeRepositoryImpl';
import { ProfilePicture } from '@modules/users/domain/userProfilePicture.entity';
import { IUserRepository } from '@modules/users/persistence/userRepository';
import { UserRepository } from '@modules/users/persistence/userRepositoryImpl';
import { Either, right } from '@shared/core/either';
import { IUseCase } from '@shared/core/useCase';
import { AppError } from '@shared/errors/BaseError';
import { enumFromValue } from '@utils/enumFromValue';
import { inject, injectable } from 'tsyringe';
import { Employee, Positions } from '../../../domain/employee.entity';
import { employeeUser, NewEmployeeDTO } from './newEmployee_DTO';
@injectable()
export class NewEmployeeUseCase
  implements IUseCase<NewEmployeeDTO, Promise<Either<AppError, Employee>>> {
  constructor(
    @inject(EmployeeRepository)
    private employeeRepository: IEmployeeRepository,
    @inject(UserRepository)
    private userRepository: IUserRepository,
    @inject(DepartamentRepository)
    private departamentRepository: IDepartamentRepository,
  ) {}
  private validateLogin = async ({ login, password }: employeeUser) => {
    const hasLogin = await this.userRepository.byLogin(login);
    if (hasLogin) throw new Error(`Login: ${login} already exist`);
  };
  public execute = async ({
    position,
    last_name,
    first_name,
    matricula,
    departament_id,
    user_credentials,
    address,
    email,
    biografia,
    picture,
  }: NewEmployeeDTO): Promise<Either<AppError, Employee>> => {
    const { rua,numero,complemento,cidade,cep,bairro } = address
    if (!(position in Positions)) throw new Error('Invalid position');
    const hasEmployee = await this.employeeRepository.byMatricula(matricula);
    if (hasEmployee) {
      throw new Error(`Employee with matricula: ${matricula} already exists`);
    }
    if (user_credentials) await this.validateLogin(user_credentials);
    const userPicture = picture
      ? ProfilePicture.build({
          picture_id: picture.public_id.split('/')[1],
          bytes: picture.bytes,
          url: picture.url,
        })
      : null;
    const departament = await this.departamentRepository.byId(departament_id);
    const employee = await this.employeeRepository.create(
      await Employee.build({
        address: Location.build({bairro,cep,cidade,complemento,numero,rua}),
        matricula,
        first_name,
        last_name,
        position: enumFromValue(position, Positions),
        departament,
        biografia: biografia ? biografia : null,
        email: email.toLowerCase(),
        userProps: user_credentials
          ? { ...user_credentials, picture: userPicture }
          : undefined,
      }),
    );
    return right(employee);
  };
}
