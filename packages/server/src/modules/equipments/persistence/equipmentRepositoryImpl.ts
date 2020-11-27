import { EntityManager } from '@mikro-orm/postgresql';
import { Pagination } from '@shared/core/pagination';
import { IBootstrap } from '@shared/infra/bootstrap';
import { inject, injectable } from 'tsyringe';
import { ProductStocks } from '@modules/products/domain/stock.entity';
import { Equipment } from '../domain/equipment.entity';
import { IEquipmentRepository } from './equipmentRepository';
import { ComponentTransfer } from '@modules/components/domain/componentTransfer.entity';
import { Component } from '@modules/components/domain/component.entity';
import { ErrorMiddleware } from '@shared/infra/http/middlewares/error.middleware';
import { RequestContext } from '@mikro-orm/core';
@injectable()
export class EquipmentRepository implements IEquipmentRepository {
  private em: EntityManager;
  constructor(@inject('bootstrap') bootstrap: IBootstrap) {
    const requestContext = RequestContext.getEntityManager();
    if (!requestContext) throw new Error(`Invalid entity context`);
    this.em = bootstrap.getDatabaseORM().getConnection().em.fork();
  }
  public getEquipandComponents = async (ids: string[]) => {
    throw new Error(`invalid`);
  };
  public byArray = async (ids: string[]): Promise<Equipment[]> => {
    return await this.em.find(
      Equipment,
      {
        component: { id: ids },
        components: { component: { id: ids } },
      },
      ['components'],
    );
  };
  public byArray2 = async (ids: string[]): Promise<Equipment[]> => {
    return await this.em.find(Equipment, { patrimony_code: ids });
    return await this.em.find(Equipment, {
      component: { id: ids },
      components: { component: { id: ids } },
    });
  };
  public create = async (instance: Equipment): Promise<Equipment> => {
    if (!(instance instanceof Equipment)) throw new Error(`Invalid Data Type`);
    await this.em.persist(instance).flush();
    return instance;
  };
  public update = async (
    patrimony_code: string,
    data: any,
  ): Promise<Equipment> => {
    throw new Error('a');
  };
  public all = async (pagination: Pagination): Promise<Equipment[]> => {
    return await this.em.find(Equipment, {});
  };
  public byId = async (id: string): Promise<Equipment | undefined> => {
    const instance = await this.em.findOne(Equipment, {
      component: { id },
    });
    if (!instance) return;
    return instance;
  };
  public byPatrimony = async (
    patrimony_code: string,
  ): Promise<Equipment | undefined> => {
    const instance = await this.em.findOne(
      Equipment,
      {
        patrimony_code,
      },
      ['component', 'components.component', 'component.departament'],
    );
    if (!instance) return;
    return instance;
  };
  public bySN = async (
    serial_number: string,
  ): Promise<Equipment | undefined> => {
    try {
      const instance = await this.em.findOne(Equipment, {
        component: { serial_number },
      });
      if (!instance) return;
      return instance;
    } catch (error) {
      throw error;
    }
  };
  public hasInstance = async (
    product_id: string,
    matricula: string,
  ): Promise<boolean> => {
    const parent = await this.em.findOne(Equipment, {
      component: { product: { id: product_id } },
      employee: { matricula },
    });
    if (!parent) return false;
    return true;
  };
  public equipmentTransfer = async (
    instance: ComponentTransfer[],
    components: Component[],
    departament_id: string,
  ): Promise<ComponentTransfer[]> => {
    const em = await this.em.fork(true);
    await em.begin();
    try {
      await em.persistAndFlush(instance);
      const componentsIds = components.map(comp => comp.id);
      const compQB = await em
        .createQueryBuilder(Component)
        .update({ departament_id, updated_at: new Date() })
        .where({ id: componentsIds })
        .execute();
      await em.commit().catch(err => console.log(err, 'xxx'));
      return instance;
    } catch (e) {
      console.log(e.detail, 'error');
      await em.rollback();
      throw e;
    }
  };
}
