import { RequestContext } from '@mikro-orm/core';
import { injectable } from 'tsyringe';
import { PasswordLogs } from '../domain/passwordLogs.entity';
import { IPasswordLogsRepository } from './passwordLogsRepository';
@injectable()
export class PasswordLogsRepository implements IPasswordLogsRepository {
  private em: any;
  constructor() {
    this.em = RequestContext.getEntityManager();
  }
  //public create = async (
  //  logs: PasswordLogs,
  //  em: any
  //): Promise<PasswordLogs> => {
  //  if (!(logs instanceof PasswordLogs)) throw new Error(`Invalid Data Type`);
  //  await em ? em.persistAndFlush(logs) : this.em.persistAndFlush(logs);
  //  return logs;
  //};
}
