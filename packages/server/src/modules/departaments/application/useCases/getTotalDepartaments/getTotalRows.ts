import { IDepartamentRepository } from '@modules/departaments/persistence/departamentRepository';
import { DepartamentRepository } from '@modules/departaments/persistence/departamentRepositoryImpl';
import { Either, left, right } from '@shared/core/either';
import { Pagination } from '@shared/core/pagination';
import { IUseCase } from '@shared/core/useCase';
import { AppError } from '@shared/errors/BaseError';
import { inject, injectable } from 'tsyringe';

@injectable()
export class GetTotalRowsUseCase
  implements IUseCase<any, Promise<Either<AppError, number>>> {
  constructor(
    @inject(DepartamentRepository)
    private departamentRepository: IDepartamentRepository,
  ) {}
  public execute = async (): Promise<Either<AppError, number>> => {
    return right(await this.departamentRepository.total());
  };
}
