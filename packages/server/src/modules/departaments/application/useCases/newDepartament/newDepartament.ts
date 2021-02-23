import { DepartamentRequests } from '@modules/departaments/domain/requests.entity';
import { IDepartamentRepository } from '@modules/departaments/persistence/departamentRepository';
import { DepartamentRepository } from '@modules/departaments/persistence/departamentRepositoryImpl';
import { Either, left, right } from '@shared/core/either';
import { IUseCase } from '@shared/core/useCase';
import { AppError } from '@shared/errors/BaseError';
import { inject, injectable } from 'tsyringe';
import { Departament } from '../../../domain/departament.entity';
import { CreateDepartamentDTO } from './newDepartament_DTO';
@injectable()
export class CreateDepartamentUseCase
  implements
    IUseCase<CreateDepartamentDTO, Promise<Either<AppError, Departament>>> {
  constructor(
    @inject(DepartamentRepository)
    private departamentRepository: IDepartamentRepository,
  ) {}
  public execute = async ({
    departament_name,
    sigla,
    code,
    method,
    url,
  }: CreateDepartamentDTO & {
    code: number;
    method: string;
    url: string;
  }): Promise<Either<AppError, Departament>> => {
    const hasDepartament = await this.departamentRepository.byNameOrSigla(
      departament_name,
      sigla,
    );
    if (hasDepartament) throw Error(`${departament_name} already exists`);
    const departament = Departament.build({
      departament_name,
      initial_acronyms: sigla,
    });
    const request = DepartamentRequests.build({
      url,
      method,
      code,
      departament,
    });
    console.log(request, 'request')
    const createdDepartament = await this.departamentRepository.create({
      departament,
      request,
    });
    return right(createdDepartament);
  };
}
