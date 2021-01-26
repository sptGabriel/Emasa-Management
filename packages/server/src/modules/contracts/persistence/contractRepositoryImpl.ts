import { RequestContext, wrap } from '@mikro-orm/core';
import { Pagination } from '@shared/core/pagination';
import { IBootstrap } from '@shared/infra/bootstrap';
import { injectable } from 'tsyringe';
import { Contract } from '../domain/contract.entity';
import { IContractRepository } from './contractRepository';
@injectable()
export class ContractRepository implements IContractRepository {
  private em: any;
  constructor() {
    this.em = RequestContext.getEntityManager()
  }
  public create = async (contract: Contract): Promise<Contract> => {
    if (!(contract instanceof Contract)) throw new Error(`Invalid Data Type`);
    await this.em.persist(contract).flush();
    return contract;
  };
  public update = async (id: string, data: any): Promise<Contract> => {
    const contract = await this.em.findOne(Contract, id);
    if (!contract) throw new Error(`${data} dont exists`);
    wrap(contract).assign(data);
    await this.em.persist(contract).flush();
    return contract;
  };
  public all = async (pagination: Pagination): Promise<Contract[]> => {
    return await this.em.find(Contract, {});
  };
  public byId = async (id: string): Promise<Contract | undefined> => {
    const contract = await this.em.findOne(Contract, { id: id });
    if (!contract) return;
    return contract;
  };
  public bySignature = async (
    signature: string,
  ): Promise<Contract | undefined> => {
    const contract = await this.em.findOne(Contract, { signature });
    if (!contract) return;
    return contract;
  };
}
