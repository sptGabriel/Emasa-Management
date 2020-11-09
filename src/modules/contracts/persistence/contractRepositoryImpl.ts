import { wrap } from '@mikro-orm/core';
import { EntityRepository, EntityManager } from '@mikro-orm/postgresql';
import { Pagination } from '@shared/core/pagination';
import { inject, injectable } from 'tsyringe';
import { couldStartTrivia } from 'typescript';
import { Contract } from '../domain/contract.entity';
import { IContractRepository } from './contractRepository';
@injectable()
export class ContractRepository implements IContractRepository {
  private repository: EntityRepository<Contract>;
  constructor(@inject('EntityManager') private entityManager: EntityManager) {
    this.repository = entityManager.getRepository(Contract);
  }
  public create = async (contract: Contract): Promise<Contract> => {
    if (!(contract instanceof Contract)) throw new Error(`Invalid Data Type`);
    await this.repository.persist(contract).flush();
    return contract;
  };
  public update = async (id: string, data: any): Promise<Contract> => {
    const contract = await this.repository.findOne(id);
    if (!contract) throw new Error(`${data} dont exists`);
    wrap(contract).assign(data);
    await this.repository.persist(contract).flush();
    return contract;
  };
  public all = async (pagination: Pagination): Promise<Contract[]> => {
    return await this.repository.findAll();
  };
  public byId = async (id: string): Promise<Contract | undefined> => {
    const contract = await this.repository.findOne({ id });
    if (!contract) return;
    return contract;
  };
  public bySignature = async (
    signature: string,
  ): Promise<Contract | undefined> => {
    const contract = await this.repository.findOne({ signature });
    if (!contract) return;
    return contract;
  };
}
