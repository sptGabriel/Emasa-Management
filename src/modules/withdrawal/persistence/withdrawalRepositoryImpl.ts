import { wrap } from '@mikro-orm/core';
import { EntityManager } from '@mikro-orm/postgresql';
import { Pagination } from '@shared/core/pagination';
import { IBootstrap } from '@shared/infra/bootstrap';
import { inject, injectable } from 'tsyringe';
import { Withdrawal } from '../domain/withdrawal.entity';
import { ProductStocks } from '@modules/products/domain/stock.entity';
import { IWithdrawalRepository } from './withdrawalRepository';
import { WithdrawalComponents } from '../domain/withdrawalComponents.entity';
@injectable()
export class WithdrawalRepository implements IWithdrawalRepository {
  private em: EntityManager;
  constructor(@inject('bootstrap') bootstrap: IBootstrap) {
    this.em = bootstrap.getDatabaseORM().getConnection().em.fork();
  }
  public bySN = async (
    sn: string,
  ): Promise<WithdrawalComponents | undefined> => {
    const instance = await this.em.findOne(
      WithdrawalComponents,
      {
        component: { serial_number: sn },
      },
      ['component', 'withdrawal'],
    );
    if (!instance) return;
    return instance;
  };
  public byArray = async (ids: string[]): Promise<Withdrawal[]> => {
    throw new Error('a');
  };
  public withdrawalProduct = async (
    instance: WithdrawalComponents,
  ): Promise<WithdrawalComponents> => {
    if (!(instance instanceof WithdrawalComponents))
      throw new Error(`Invalid Data Type`);
    await this.em.begin();
    try {
      await this.em.persist(instance).flush();
      const stockQueryBuilder = this.em.createQueryBuilder(ProductStocks);
      const stock = await stockQueryBuilder
        .update({
          quantity: stockQueryBuilder.raw(`quantity - 1`),
          updated_at: new Date(),
        })
        .where({
          id: instance.component.stock_id,
          product: instance.component.product.id,
        })
        .execute();
      await this.em.commit();
      return instance;
    } catch (e) {
      console.log(e.detail, 'error');
      await this.em.rollback();
      throw e;
    }
  };
  public create = async (instance: Withdrawal): Promise<Withdrawal> => {
    if (!(instance instanceof Withdrawal)) throw new Error(`Invalid Data Type`);
    await this.em.persist(instance).flush();
    return instance;
  };
  public update = async (sn: string, data: any): Promise<Withdrawal> => {
    throw new Error('a');
  };
  public all = async (pagination: Pagination): Promise<Withdrawal[]> => {
    throw new Error('a');
  };
  public byId = async (id: string): Promise<Withdrawal | undefined> => {
    throw new Error('a');
  };
  public byPatrimony = async (
    patrimony_code: string,
  ): Promise<Withdrawal | undefined> => {
    throw new Error('a');
  };
}
