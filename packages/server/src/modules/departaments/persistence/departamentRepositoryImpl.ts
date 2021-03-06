import {
  LoadStrategy,
  QueryFlag,
  QueryOrder,
  RequestContext,
  wrap,
} from '@mikro-orm/core';
import { EntityManager } from '@mikro-orm/postgresql';
import { Pagination } from '@shared/core/pagination';
import { injectable } from 'tsyringe';
import { Departament } from '../domain/departament.entity';
import { DepartamentRequests } from '../domain/requests.entity';
import { IDepartamentRepository } from './departamentRepository';
@injectable()
export class DepartamentRepository implements IDepartamentRepository {
  private em: any;
  constructor() {
    this.em = RequestContext.getEntityManager();
  }
  public create = async ({
    departament,
    request,
  }: {
    departament: Departament;
    request: DepartamentRequests;
  }): Promise<Departament> => {
    const em = await this.em.fork();
    await em.begin();
    try {
      request.code = 200
      await em.persist(departament);
      await em.persist(request);
      await em.commit();
    } catch (e) {
      await em.rollback();
      request.code = 500
      await em.persistAndFlush(request);
      throw e;
    }
    if (!(departament instanceof Departament))
      throw new Error(`Invalid Data Type`);
    await this.em.persist(departament).flush();
    return departament;
  };
  public update = async (id: string, data: any): Promise<Departament> => {
    const departament = await this.em.findOne(Departament, id);
    if (!departament) throw new Error(`${data.departament_name} dont exists`);
    wrap(departament).assign(data);
    await this.em.persist(departament).flush();
    return departament;
  };
  public all = async (
    pagination: Pagination,
  ): Promise<{ departaments: Departament[]; total: number }> => {
    const departaments: Departament[] = await this.em.find(
      Departament,
      {},
      {
        orderBy: { createdAt: QueryOrder.DESC },
        offset: pagination.offset(),
        limit: pagination.perPage(),
        flags: [QueryFlag.PAGINATE],
      },
    );
    await this.em.populate(departaments, ['employees', 'requests']);
    const total = await this.total();
    return { departaments, total };
  };
  public byArray = async (id: string[]): Promise<Departament[]> => {
    return await this.em.find(Departament, { id });
  };
  public byId = async (id: string): Promise<Departament | undefined> => {
    const departamentRow = await this.em.findOne(Departament, { id }, [
      'employees','requests'
    ]);
    if (!departamentRow) return;
    return departamentRow;
  };
  public logsById = async (id: string): Promise<DepartamentRequests[]> => {
    return await this.em.find(DepartamentRequests, { departament_id:id });
  };
  public byName = async (
    departament_name: string,
  ): Promise<Departament | undefined> => {
    const departamentRow = await this.em.findOne(Departament, {
      departament_name,
    });
    if (!departamentRow) return;
    return departamentRow;
  };
  public byNameOrSigla = async (
    departament_name: string,
    sigla: string,
  ): Promise<Departament | undefined> => {
    const departamentRow = await this.em.findOne(Departament, {
      departament_name,
      $or: [{ initial_acronyms: sigla }],
    });
    if (!departamentRow) return;
    return departamentRow;
  };
  public total = async (): Promise<number> => await this.em.count(Departament);
}
