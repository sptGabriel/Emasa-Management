import {
  Connection,
  EntityManager,
  IDatabaseDriver,
  MikroORM,
  Options,
} from '@mikro-orm/core';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';
import { IDatabaseORM } from './orm.contract';
import { container, inject, injectable } from 'tsyringe';
import chalk from 'chalk';
@injectable()
export class MikroOrmClient implements IDatabaseORM {
  private connection: MikroORM<PostgreSqlDriver>;
  constructor(
    @inject('OrmConfig') private options: Options<PostgreSqlDriver>,
  ) {}
  public getConnection = (): MikroORM<PostgreSqlDriver> => {
    return this.connection;
  };
  public close(): void {
    if (!this.connection) return;
    this.connection.close();
  }
  public getEntityManager(): EntityManager {
    return this.connection.em;
  }
  public start = async () => {
    try {
      this.connection = await MikroORM.init(this.options);
      container.registerInstance<EntityManager>(
        'EntityManager',
        this.getEntityManager(),
      );
      const migrator = await this.connection.getMigrator();
      const migrations = await migrator.getPendingMigrations();
      if (!(migrations && migrations.length > 0)) return;
      await migrator.up();
    } catch (error) {
      process.stdout.write(chalk.redBright(`${(error as Error).message}\n`));
    }
  };
}
