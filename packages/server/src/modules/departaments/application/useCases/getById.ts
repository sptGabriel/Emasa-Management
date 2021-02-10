import { IDepartamentRepository } from '@modules/departaments/persistence/departamentRepository';
import { DepartamentRepository } from '@modules/departaments/persistence/departamentRepositoryImpl';
import { Either, left, right } from '@shared/core/either';
import { IUseCase } from '@shared/core/useCase';
import { AppError } from '@shared/errors/BaseError';
import { inject, injectable } from 'tsyringe';
import { Departament } from '../../domain/departament.entity';
@injectable()
export class getByID
  implements IUseCase<string, Promise<Either<AppError, Departament>>> {
  constructor(
    @inject(DepartamentRepository)
    private departamentRepository: IDepartamentRepository,
  ) {}
  public execute = async (
    id: string,
  ): Promise<Either<AppError, Departament>> => {
    const departament = await this.departamentRepository.byId(id);
    if (!departament)	throw new Error(`Departament already exists`)
    return right(departament.formatedReponse);
  };
}
