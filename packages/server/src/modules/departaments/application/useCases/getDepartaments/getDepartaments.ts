import { IDepartamentRepository } from '@modules/departaments/persistence/departamentRepository';
import { DepartamentRepository } from '@modules/departaments/persistence/departamentRepositoryImpl';
import { Either, left, right } from '@shared/core/either';
import { Pagination } from '@shared/core/pagination';
import { IUseCase } from '@shared/core/useCase';
import { AppError } from '@shared/errors/BaseError';
import { inject, injectable } from 'tsyringe';
import { Departament } from '../../../domain/departament.entity';
@injectable()
export class GetDepartamentsUseCase
  implements
    IUseCase<
      { pagination: Pagination },
      Promise<Either<AppError, { departaments: Departament[]; total: number }>>
    > {
  constructor(
    @inject(DepartamentRepository)
    private departamentRepository: IDepartamentRepository,
  ) {}
  public execute = async ({
    pagination,
  }: {
    pagination: Pagination;
  }): Promise<
    Either<AppError, { departaments: Departament[]; total: number }>
  > => {
    const { departaments, total } = await this.departamentRepository.all(
      pagination,
    );
    return right({
      departaments: departaments.map(dep => dep.formatedReponse),
      total,
    });
  };
}
