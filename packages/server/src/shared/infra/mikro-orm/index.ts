import {
  EntityManager,
  MikroORM,
  Options,
} from '@mikro-orm/core';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';
import { container, inject, injectable } from 'tsyringe';
import { IDatabaseORM } from '@shared/core/orm';
import LoggerProvider from '@shared/adapters/models/LoggerProvider';

@injectable()
export class MikroOrmClient implements IDatabaseORM {
  private connection: MikroORM<PostgreSqlDriver>;
  constructor(
    @inject('OrmConfig') private options: Options<PostgreSqlDriver>,
    @inject('LoggerProvider') private loggerProvider: LoggerProvider,
  ) {}
  public getConnection = (): MikroORM<PostgreSqlDriver> => {
    return this.connection;
  };
  public close = async (): Promise<void> => {
    if (!this.connection) return;
    this.connection.close();
  }
  public getEntityManager(): EntityManager {
    return this.connection.em;
  }
  public connect = async (): Promise<void> => {
    try {
      this.connection = await MikroORM.init(this.options)
      container.registerInstance<EntityManager>(
        'EntityManager',
        this.getEntityManager(),
      );
      const migrator = await this.connection.getMigrator();
      const migrations = await migrator.getPendingMigrations();
      if (!(migrations && migrations.length > 0)) return this.connected();
      await migrator.up();
      this.connected()
    } catch (error) {
      this.error(error)
    }
  };

  private connected() {
    this.loggerProvider.log('info','MikroOrm has connected');
  }

  private error(error: Error) {
    this.loggerProvider.log('error','MikroOrm has errored', {error});
  }
}
