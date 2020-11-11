import { IDepartamentRepository } from '@modules/departaments/persistence/departamentRepository';
import { DepartamentRepository } from '@modules/departaments/persistence/departamentRepositoryImpl';
import { Either, left, right } from '@shared/core/either';
import { IUseCase } from '@shared/core/useCase';
import { AppError } from '@shared/errors/BaseError';
import { inject, injectable } from 'tsyringe';
import { Departament } from '../../domain/departament.entity';
import { CreateDepartamentDTO } from '../dtos/createDepartament_DTO';
@injectable()
export class CreateDepartamentUseCase
  implements
    IUseCase<CreateDepartamentDTO, Promise<Either<AppError, Departament>>> {
  constructor(
    @inject(DepartamentRepository)
    private departamentRepository: IDepartamentRepository,
  ) {
  }
  public execute = async (
    request: CreateDepartamentDTO,
  ): Promise<Either<AppError, Departament>> => {
    const hasDepartament = await this.departamentRepository.byName(
      request.departament_name,
    );
    if (hasDepartament) {
      return left(new Error(`${request.departament_name} already exists`));
    }
    const departament = await this.departamentRepository.create(
      Departament.build(request.departament_name),
    );
    return right(departament);
  };
}
