import { DepartamentRequests } from '@modules/departaments/domain/requests.entity';
import { IDepartamentRepository } from '@modules/departaments/persistence/departamentRepository';
import { DepartamentRepository } from '@modules/departaments/persistence/departamentRepositoryImpl';
import { Either, left, right } from '@shared/core/either';
import { IUseCase } from '@shared/core/useCase';
import { AppError } from '@shared/errors/BaseError';
import { inject, injectable } from 'tsyringe';

@injectable()
export class getLogs
  implements
    IUseCase<string, Promise<Either<AppError, DepartamentRequests[]>>> {
  constructor(
    @inject(DepartamentRepository)
    private departamentRepository: IDepartamentRepository,
  ) {}
  public execute = async (
    id: string,
  ): Promise<Either<AppError, DepartamentRequests[]>> => {
		const logs = await this.departamentRepository.logsById(id);
    return right(logs);
  };
}
