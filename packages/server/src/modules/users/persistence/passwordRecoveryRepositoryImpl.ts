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
  public byEmail = async (
    email: string,
  ): Promise<PasswordRecovery | undefined> => {
    const recovery = await this.em.findOne(
      PasswordRecovery,
      { employee: { email }, used: false },
      ['employee'],
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
        employee_id: recovery.employee.id,
        token: recovery.token,
        used: recovery.used,
        expires_at: recovery.expires_at,
      })
      .execute();
    return recovery;
  };
}
