import { wrap } from '@mikro-orm/core';
import { EntityManager } from '@mikro-orm/postgresql';
import { Pagination } from '@shared/core/pagination';
import { IBootstrap } from '@shared/infra/bootstrap';
import { inject, injectable } from 'tsyringe';
import { EquipmentInstance } from '../domain/equipment.entity';
import { ProductStocks } from '@modules/products/domain/stock.entity';
import { IEquipmentRepository } from './equipmentRepository';
@injectable()
export class EquiqmentRepository implements IEquipmentRepository {
  private em: EntityManager;
  constructor(@inject('bootstrap') bootstrap: IBootstrap) {
    this.em = bootstrap.getDatabaseORM().getConnection().em.fork();
  }
  public byArray = async (ids: string[]): Promise<EquipmentInstance[]> => {
    return await this.em.find(EquipmentInstance, { patrimony_code: ids });
  };
  public create = async (
    instance: EquipmentInstance,
  ): Promise<EquipmentInstance> => {
    if (!(instance instanceof EquipmentInstance))
      throw new Error(`Invalid Data Type`);
    await this.em.persist(instance).flush();
    return instance;
  };
  public update = async (
    patrimony_code: string,
    data: any,
  ): Promise<EquipmentInstance> => {
    const instance = await this.em.findOne(EquipmentInstance, {
      patrimony_code,
    });
    if (!instance) throw new Error(`${data.matricula} dont exists`);
    wrap(instance).assign(data);
    await this.em.persist(data).flush();
    return instance;
  };
  public all = async (pagination: Pagination): Promise<EquipmentInstance[]> => {
    return await this.em.find(EquipmentInstance, {});
  };
  public byId = async (id: string): Promise<EquipmentInstance | undefined> => {
    const instance = await this.em.findOne(EquipmentInstance, {
      id,
    });
    if (!instance) return;
    return instance;
  };
  public byPatrimony = async (
    patrimony_code: string,
  ): Promise<EquipmentInstance | undefined> => {
    const instance = await this.em.findOne(EquipmentInstance, {
      patrimony_code,
    });
    if (!instance) return;
    return instance;
  };
  public bySN = async (
    serial_number: string,
  ): Promise<EquipmentInstance | undefined> => {
    try {
      const instance = await this.em.findOne(EquipmentInstance, {
        component:{serial_number},
      });
      if (!instance) return;
      return instance;
    } catch (error) {
      throw error
    }
  };
  public hasInstance = async (
    product_id: string,
    matricula: string,
  ): Promise<boolean> => {
    const parent = await this.em.findOne(EquipmentInstance, {
      component: { product: { id: product_id } },
      employee: { matricula },
    });
    if (!parent) return false;
    return true;
  };
}
