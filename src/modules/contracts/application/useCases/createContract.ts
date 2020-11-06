import { IContractRepository } from '@modules/contracts/persistence/contractRepository';
import { ContractRepository } from '@modules/contracts/persistence/contractRepositoryImpl';
import { Either, left, right } from '@shared/core/either';
import { IUseCase } from '@shared/core/useCase';
import { AppError } from '@shared/errors/BaseError';
import { inject, injectable } from 'tsyringe';
import { Contract } from '../../domain/contract.entity';
import { CreateContractDTO } from '../dtos/createContract_DTO';
@injectable()
export class CreateContractUseCase
  implements IUseCase<CreateContractDTO, Promise<Either<AppError, Contract>>> {
  constructor(
    @inject(ContractRepository)
    private contractRepository: IContractRepository,
  ) {}
  public execute = async ({
    name,
    signature,
  }: CreateContractDTO): Promise<Either<AppError, Contract>> => {
    const hasContract = await this.contractRepository.bySignature(signature);
    if (hasContract) return left(new Error(`${signature} already exists`));
    const contract = await this.contractRepository.create(
      Contract.build({ name, signature }),
    );
    return right(contract);
  };
}
