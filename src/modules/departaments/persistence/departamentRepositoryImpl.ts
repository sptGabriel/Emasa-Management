import { wrap } from '@mikro-orm/core';
import { EntityRepository, EntityManager } from '@mikro-orm/postgresql';
import { Pagination } from '@shared/core/pagination';
import { inject, injectable } from 'tsyringe';
import { Departament } from '../domain/departament.entity';
import { IDepartamentRepository } from './departamentRepository';
@injectable()
export class DepartamentRepository implements IDepartamentRepository {
  private repository: EntityRepository<Departament>;
  constructor(@inject('EntityManager') private entityManager: EntityManager) {
    this.repository = entityManager.getRepository(Departament);
  }
  public create = async (departament: Departament): Promise<Departament> => {
    if(!(departament instanceof Departament)) throw new Error(`Invalid Data Type`)
    await this.repository.persist(departament).flush();
    return departament;
  };
  public update = async (
    id: string,
    data: any,
  ): Promise<Departament> => {
    const departament = await this.repository.findOne(id)
    if(!departament) throw new Error(`${data.departament_name} dont exists`)
    wrap(departament).assign(data)
    await this.repository.persist(departament).flush();
    return departament;
  };
  public all = async (pagination: Pagination): Promise<Departament[]> => {
    return await this.repository.findAll()
  }
  public byId = async (id: string): Promise<Departament | undefined> => {
    const departamentRow = await this.repository.findOne({ id });
    if (!departamentRow) return;
    return departamentRow;
  };
  public byName = async (departament_name: string): Promise<Departament | undefined> => {
    const departamentRow = await this.repository.findOne({ departament_name });
    if (!departamentRow) return;
    return departamentRow;
  }
}
