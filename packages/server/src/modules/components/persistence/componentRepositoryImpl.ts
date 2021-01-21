import { RequestContext, wrap } from '@mikro-orm/core';
import { Pagination } from '@shared/core/pagination';
import { injectable } from 'tsyringe';
import { Component } from '../domain/component.entity';
import { ProductStocks } from '@modules/products/domain/stock.entity';
import { IComponentRepository } from './componentRepository';
import { ComponentTransfer } from '../domain/componentTransfer.entity';
@injectable()
export class ComponentRepository implements IComponentRepository {
  private em: any;
  constructor() {
    this.em = RequestContext.getEntityManager()
  }
  public bySN2 = async (
    serial_number: string,
  ): Promise<Component | undefined> => {
    const instance = await this.em.findOne(
      Component,
      {
        serial_number: serial_number,
      },
      ['withdrawal'],
    );
    if (!instance) return;
    return instance;
  };
  public getComponents = async (sn_keys: string[]): Promise<Component[]> => {
    return await this.em.find(
      Component,
      {
        $or: [
          { serial_number: sn_keys },
          { equipment: { component: { serial_number: sn_keys } } },
          { equipments: { component: { serial_number: sn_keys } } },
        ],
      },
      ['equipment', 'equipments'],
    );
  };
  public byArray = async (ids: string[]): Promise<Component[]> => {
    const equipments = await this.em.find(
      Component,
      {
        $or: [
          { serial_number: ids },
          { equipment: { component: { serial_number: ids } } },
          { equipments: { component: { serial_number: ids } } },
        ],
      },
      ['equipment', 'equipments'],
    );
    throw new Error('a');
  };
  public create = async (instance: Component): Promise<Component> => {
    if (!(instance instanceof Component)) throw new Error(`Invalid Data Type`);
    await this.em.begin();
    try {
      await this.em.persist(instance).flush();
      const stockQueryBuilder = this.em.createQueryBuilder(ProductStocks);
      const stock = await stockQueryBuilder
        .update({ quantity: stockQueryBuilder.raw(`quantity - 1`) })
        .where({ id: instance.stock_id, product: instance.product.id })
        .execute();
      await this.em.commit();
      return instance;
    } catch (e) {
      console.log(e.detail, 'error');
      await this.em.rollback();
      throw e;
    }
  };
  public componentTransfer = async (
    instance: ComponentTransfer,
    component:Component
  ): Promise<ComponentTransfer> => {
    // if (!(instance instanceof Component)) throw new Error(`Invalid Data Type`);
    await this.em.begin();
    try {
      await this.em.persistAndFlush(instance);
      await this.em.persistAndFlush(component)
      await this.em.commit();
      return instance;
    } catch (e) {
      console.log(e.detail, 'error');
      await this.em.rollback();
      throw e;
    }
  };
  public equipmentTransfer = async (
    instance: ComponentTransfer,
  ): Promise<ComponentTransfer> => {
    if (!(instance instanceof Component)) throw new Error(`Invalid Data Type`);
    await this.em.begin();
    try {
      await this.em.persist(instance).flush();
      const componentQueryBuilder = this.em
        .createQueryBuilder(Component)
        .update({ departament_id: instance.new_departament })
        .where({component_id:instance.component_id}).execute();
      await this.em.commit();
      return instance;
    } catch (e) {
      console.log(e.detail, 'error');
      await this.em.rollback();
      throw e;
    }
  };
  public update = async (
    serial_number: string,
    data: any,
  ): Promise<Component> => {
    const instance = await this.em.findOne(Component, {
      serial_number,
    });
    if (!instance) throw new Error(`${data.matricula} dont exists`);
    wrap(instance).assign(data);
    await this.em.persist(data).flush();
    return instance;
  };
  public all = async (pagination: Pagination): Promise<Component[]> => {
    return await this.em.find(Component, {});
  };
  public byId = async (
    serial_number: string,
  ): Promise<Component | undefined> => {
    const instance = await this.em.findOne(Component, {
      serial_number,
    });
    if (!instance) return;
    return instance;
  };
  public bySN = async (
    serial_number: string,
  ): Promise<Component | undefined> => {
    const instance = await this.em.findOne(
      Component,
      {
        serial_number: serial_number,
      },
      ['equipment', 'equipments'],
    );
    if (!instance) return;
    return instance;
  };
  public hasInstance = async (
    id: string,
    matricula: string,
  ): Promise<boolean> => {
    const parent = await this.em.findOne(Component, {
      product: { id },
    });
    if (!parent) return false;
    return true;
  };
}
