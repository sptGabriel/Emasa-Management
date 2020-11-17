import { wrap } from '@mikro-orm/core';
import { EntityManager } from '@mikro-orm/postgresql';
import { Pagination } from '@shared/core/pagination';
import { IBootstrap } from '@shared/infra/bootstrap';
import { inject, injectable } from 'tsyringe';
import { EquipmentInstance } from '../domain/equipment.entity';
import { IEquipmentRepository } from './equipmentRepository';
@injectable()
export class EquipmentRepository implements IEquipmentRepository {
  private em: EntityManager;
  constructor(@inject('bootstrap') bootstrap: IBootstrap) {
    this.em = bootstrap.getDatabaseORM().getConnection().em.fork();
  }
  public create = async (contract: EquipmentInstance): Promise<EquipmentInstance> => {
    if (!(contract instanceof EquipmentInstance)) throw new Error(`Invalid Data Type`);
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
