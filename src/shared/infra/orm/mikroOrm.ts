import {
  Connection,
  EntityManager,
  IDatabaseDriver,
  MikroORM,
  Options,
} from '@mikro-orm/core';
import { IDatabaseORM } from './orm.contract';
import { container, inject, injectable } from 'tsyringe';
import ORMConfig from '@config/mikro.config'
import chalk from 'chalk';
@injectable()
export class MikroOrmClient implements IDatabaseORM {
  private connection: MikroORM<IDatabaseDriver<Connection>>;
  constructor(@inject('OrmConfig') private options: Options) {}
  public getConnection = (): MikroORM<IDatabaseDriver<Connection>> => {
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
      container.registerInstance(
        'Connection',
        this.getConnection(),
      );
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
