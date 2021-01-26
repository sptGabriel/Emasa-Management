import {
  Connection,
  EntityManager,
  IDatabaseDriver,
  MikroORM,
} from '@mikro-orm/core';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';

export interface IDatabaseORM {
  start(): void;
  close(): void;
  getEntityManager(): EntityManager;
  getConnection(): MikroORM<PostgreSqlDriver>;
}
