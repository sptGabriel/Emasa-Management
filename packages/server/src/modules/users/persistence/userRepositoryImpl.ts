import { RequestContext, wrap } from '@mikro-orm/core';
import { Pagination } from '@shared/core/pagination';
import { IBootstrap } from '@shared/infra/bootstrap';
import { inject, injectable } from 'tsyringe';
import { User } from '../domain/user.entity';
import { ProfilePicture } from '../domain/userProfilePicture.entity';
import { IUserRepository } from './userRepository';
@injectable()
export class UserRepository implements IUserRepository {
  private em: any;
  constructor() {
    this.em = RequestContext.getEntityManager()
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
  public setRFToken = async (user: User): Promise<User> => {
    await this.em.persistAndFlush(user);
    // await this.em
    //   .createQueryBuilder(User)
    //   .update({ ref_token: user.ref_token, active: user.active, updated_at: new Date() })
    //   .where({
    //     employee: { id: user.employee.id },
    //   })
    //   .execute();
    return user;
  };
  public login = async (user: User, ip: string): Promise<User> => {
    const em = await this.em.fork();
    await em.begin();
    try {
      const IPV4QB = em.createQueryBuilder('ipv4_access_status');
      const UserQB = em.createQueryBuilder(User);
      const LastAccessQB = em.createQueryBuilder('lastaccess_users');
      const isLogged: any = await IPV4QB.getKnex()
        .select('*')
        .where({ ip_address: ip, employee_id: user.employee.id })
        .returning('*')
        .then((row: any) => row[0]);
      if (isLogged && isLogged.active) {
        throw new Error(`This user has been logged`);
      }
      if (!isLogged) {
        await IPV4QB.insert({
          employee_id: user.employee.id,
          ip_address: ip,
          active: true,
          created_at: new Date(),
          updated_at: new Date(),
        }).execute();
      }
      if (isLogged && !isLogged.active) {
        await IPV4QB.update({ active: true, updated_at: new Date() })
          .where({
            employee_id: user.employee.id,
            ip_address: ip,
          })
          .execute();
      }
      await UserQB.update({
        ref_token: user.ref_token,
        updated_at: new Date(),
      })
        .where({
          employee: { id: user.employee.id },
        })
        .execute();
      await LastAccessQB.insert({
        employee_id: user.employee.id,
        ip_address: ip,
        accessed_at: new Date(),
      }).execute();
      await em.commit();
      return user;
    } catch (e) {
      console.log(e, 'error');
      await em.rollback();
      throw e;
    }
    // await this.em
    //   .createQueryBuilder(User)
    //   .update({ ref_token: user.ref_token, active: user.active, updated_at: new Date() })
    //   .where({
    //     employee: { id: user.employee.id },
    //   })
    //   .execute();
  };
  public logout = async (user: User, ip: string): Promise<User> => {
    const em = await this.em.fork();
    await em.begin();
    try {
      const UserQB = em.createQueryBuilder(User);
      const IPV4QB = em.createQueryBuilder('ipv4_access_status');
      const isLogged: any = await IPV4QB.getKnex()
        .select('*')
        .where({ ip_address: ip, employee_id: user.employee.id })
        .returning('*')
        .then((row: any) => row[0]);
      if (!isLogged) throw new Error(`Invalid Credentials`);
      if (isLogged && !isLogged.active)
        throw new Error(`This already logged out on this device`);
      await UserQB.update({ ref_token: null })
        .where({
          employee: { id: user.employee.id },
        })
        .execute();
      await IPV4QB.update({ active: false, updated_at: new Date() }).execute();
      await em.commit();
      return user;
    } catch (e) {
      console.log(e, 'error');
      await em.rollback();
      throw e;
    }
  };
  public all = async (pagination: Pagination): Promise<User[]> => {
    return await this.em.find(User, {});
  };
  public byId = async (id: string): Promise<User | undefined> => {
    const user = await this.em.findOne(User, { employee: { id } }, [
      'employee',
      'employee.departament',
      'employee.address'
    ]);
    if (!user) return;
    return user;
  };
  public byEmail = async (email: string): Promise<User | undefined> => {
    const user = await this.em.findOne(User, { employee: { email } }, [
      'employee',
      'employee.departament',
      'employee.address'
    ]);
    if (!user) return;
    return user;
  };
  public byLogin = async (login: string): Promise<User | undefined> => {
    const user = await this.em.findOne(User, { login }, ['employee']);
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
  public changePictureProfile = async (user: User): Promise<User> => {
    const em = await this.em.fork();
    await em.begin();
    try {
      const UserQB = em.createQueryBuilder(User);
      const ProfileQB = em.createQueryBuilder(ProfilePicture);
      await ProfileQB.insert({
        picture_id: user.picture?.picture_id,
        url: user.picture?.url,
        bytes: user.picture?.bytes,
      }).execute();
      await UserQB.update({
        picture_id: user.picture?.picture_id,
        updated_at: new Date(),
      }).execute();
      await em.commit();
      return user;
    } catch (e) {
      console.log(e, 'error');
      await em.rollback();
      throw e;
    }
  };
}
