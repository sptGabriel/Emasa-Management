import { wrap } from '@mikro-orm/core';
import { EntityManager } from '@mikro-orm/postgresql';
import { Pagination } from '@shared/core/pagination';
import { IBootstrap } from '@shared/infra/bootstrap';
import { inject, injectable } from 'tsyringe';
import { User } from '../domain/user.entity';
import { IUserRepository } from './userRepository';
@injectable()
export class UserRepository implements IUserRepository {
  private em: EntityManager;
  constructor(@inject('bootstrap') bootstrap: IBootstrap) {
    this.em = bootstrap.getDatabaseORM().getConnection().em.fork();
  }
  public create = async (user: User): Promise<User> => {
    if (!(user instanceof User)) throw new Error(`Invalid Data Type`);
    await this.em.persist(user).flush();
    return user;
  };
  public update = async (user: User): Promise<User> => {
    await this.em.persistAndFlush(user);
    return user;
  };
  public updatePassword = async (user: User): Promise<User> => {
    await this.em
      .createQueryBuilder(User)
      .update({ password: user.password, updated_at: new Date() })
      .where({
        employee: { id: user.employee.id },
      })
      .execute();
    return user;
  };
  public updateLogin = async (user: User): Promise<User> => {
    await this.em
      .createQueryBuilder(User)
      .update({ login: user.login, updated_at: new Date() })
      .where({
        employee: { id: user.employee.id },
      })
      .execute();
    return user;
  };
  public all = async (pagination: Pagination): Promise<User[]> => {
    return await this.em.find(User, {});
  };
  public byId = async (id: string): Promise<User | undefined> => {
    const user = await this.em.findOne(User, { employee: { id } });
    if (!user) return;
    return user;
  };
  public byLogin = async (login: string): Promise<User | undefined> => {
    const user = await this.em.findOne(User, { login });
    if (!user) return;
    return user;
  };
  public byMatricula = async (matricula: string): Promise<User | undefined> => {
    const user = await this.em.findOne(
      User,
      {
        employee: { matricula: matricula },
      },
      ['employee'],
    );
    if (!user) return;
    return user;
  };
}
