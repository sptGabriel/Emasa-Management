import { LoadStrategy, wrap } from '@mikro-orm/core';
import { EntityManager } from '@mikro-orm/postgresql';
import { DepartamentHasComponents } from '@modules/departaments/domain/departamentHasEquipaments.entity';
import { Pagination } from '@shared/core/pagination';
import { IBootstrap } from '@shared/infra/bootstrap';
import { inject, injectable } from 'tsyringe';
import { ComponentInstance } from '../domain/componentInstance.entity';
import { ProductStocks } from '../domain/stock.entity';
import { IComponentInstanceRepository } from './instanceRepository';
@injectable()
export class ComponentInstanceRepository
  implements IComponentInstanceRepository {
  private em: EntityManager;
  constructor(@inject('bootstrap') bootstrap: IBootstrap) {
    this.em = bootstrap.getDatabaseORM().getConnection().em.fork();
  }
  public byArray = async (ids: string[]): Promise<ComponentInstance[]> => {
    const qb = await this.em.createQueryBuilder(ComponentInstance, 'qb')
    .select('qb.*').join('qb.equipments', 'eq').join('qb.equipments_has_components', 'eqhascp')
    .where('qb.id':ids)
    // return await this.em.find(ComponentInstance, { id: ids, equipament:{component:{id:ids}} }, {populate:{
    // stock:LoadStrategy.JOINED,
    // }});
  };
  // public byArray2 = async (ids: string[]): Promise<ComponentInstance[]> => {
  //   const array = await this.em.createQueryBuilder(ComponentInstance, 'cp')
  //   .select(['cp.*'])
  //   .leftJoin('eq.equipments', 'eq')
  //   .leftJoin('eqcp.equipment_has_components', 'eqcp')
  //   .getResult();
  //   console.log(array)
  //   // return await this.em.find(ComponentInstance, { id: ids, equipament:{component:{id:ids}} }, {populate:{
  //   // stock:LoadStrategy.JOINED,
  //   // }});
  // };
  public create = async (
    instance: ComponentInstance,
  ): Promise<ComponentInstance> => {
    if (!(instance instanceof ComponentInstance))
      throw new Error(`Invalid Data Type`);
    await this.em.begin();
    try {
      await this.em.persist(instance).flush();
      const departaments = await this.em
        .createQueryBuilder(DepartamentHasComponents)
        .insert({
          departament_id: instance.departament?.id,
          component_id: instance.id,
        })
        .execute();
      const stockQueryBuilder = this.em.createQueryBuilder(ProductStocks);
      const stock = await stockQueryBuilder
        .update({ quantity: stockQueryBuilder.raw(`quantity - 1`) })
        .where({ id: instance.stock.id, product: instance.product.id })
        .execute();
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
  ): Promise<ComponentInstance> => {
    const instance = await this.em.findOne(ComponentInstance, {
      serial_number,
    });
    if (!instance) throw new Error(`${data.matricula} dont exists`);
    wrap(instance).assign(data);
    await this.em.persist(data).flush();
    return instance;
  };
  public all = async (pagination: Pagination): Promise<ComponentInstance[]> => {
    return await this.em.find(ComponentInstance, {});
  };
  public byId = async (
    serial_number: string,
  ): Promise<ComponentInstance | undefined> => {
    const instance = await this.em.findOne(ComponentInstance, {
      serial_number,
    });
    if (!instance) return;
    return instance;
  };
  public bySN = async (
    serial_number: string,
  ): Promise<ComponentInstance | undefined> => {
    const instance = await this.em.findOne(ComponentInstance, {
      serial_number,
    });
    if (!instance) return;
    return instance;
  };
  public hasInstance = async (
    id: string,
    matricula: string,
  ): Promise<boolean> => {
    const parent = await this.em.findOne(ComponentInstance, {
      product: { id },
    });
    if (!parent) return false;
    return true;
  };
}
