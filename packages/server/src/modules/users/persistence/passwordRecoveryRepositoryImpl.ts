import { RequestContext } from '@mikro-orm/core';
import { Pagination } from '@shared/core/pagination';
import { injectable } from 'tsyringe';
import { PasswordRecovery } from '../domain/passwordRecovery.entity';
import { IPasswordRecoveryRepository } from './passwordRecoveryRepository';
@injectable()
export class PasswordRecoveryRepository implements IPasswordRecoveryRepository {
  private em: any;
  constructor() {
    this.em = RequestContext.getEntityManager();
  }
  all(pagination: Pagination): Promise<PasswordRecovery[]> {
    throw new Error('Method not implemented.');
  }
  public deleteExpiredTokens = async (
    email: string,
  ): Promise<PasswordRecovery[]> => {
    return await this.em.nativeDelete(PasswordRecovery, {
      $and: [{ 'expires_at <': new Date() }],
    });
  };

  public byUser = async (
    user_id: string,
  ): Promise<PasswordRecovery | undefined> => {
    const recovery = await this.em.findOne(
      PasswordRecovery,
      {
        user: { employee: { id: user_id}},
        used: false,
        $and: [{ 'expires_at >': new Date() }],
      },
      ['user', 'user.employee'],
    )
    return recovery;
  };

  public byEmail = async (
    email: string,
  ): Promise<PasswordRecovery | undefined> => {
    const recovery = await this.em.findOne(
      PasswordRecovery,
      {
        user: { employee: email},
        used: false,
        $and: [{ 'expires_at >': new Date() }],
      },
      ['user', 'user.employee'],
    )
    return recovery;
  };

  public byToken = async (
    token: string,
  ): Promise<PasswordRecovery | undefined> => {
    //const recoveryQB = await this.em.createQueryBuilder('PasswordRecovery');
    //const recovery2 =await recoveryQB
    //  .select('*')
    //  .join('employee', 'pr.employee_id', '=', 'employee.id')
    //  .join('user', 'employee.id', '=', 'user.employee_id')
    //  .wehere({ token, used: false})
    //  .where('expires_at', '>', new Date()).execute()
    //console.log(recovery2)
    const recovery = await this.em.findOne(
      PasswordRecovery,
      {
        token,
        used: false,
        $and: [{ 'expires_at >': new Date() }],
      },
      ['user'],
    );
    return recovery;
  };

  public create = async (
    recovery: PasswordRecovery,
  ): Promise<PasswordRecovery> => {
    if (!(recovery instanceof PasswordRecovery))
      throw new Error(`Invalid Data Type`);
    const recoveryQB = this.em.createQueryBuilder(PasswordRecovery);
    await recoveryQB
      .insert({
        user_id: recovery.user.employee.id,
        token: recovery.token,
        used: recovery.used,
        expires_at: recovery.expires_at,
      })
      .execute();
    return recovery;
  };

  //public expireToken = async (
  //  Recovery: PasswordRecovery,
  //  em?: any
  //): Promise<PasswordRecovery> => {
  //  if (!(Recovery instanceof PasswordRecovery))
  //    throw new Error(`Invalid type`);
  //  const entityManager = em ? em : this.em
  //  const recoveryQB = entityManager.createQueryBuilder(PasswordRecovery);
  //  await recoveryQB.update({ used: true }).where({
  //    token: Recovery.token,
  //    user_id: Recovery.user.employee.id,
  //    id: Recovery.id,
  //  });
  //  return Recovery;
  //};
}
