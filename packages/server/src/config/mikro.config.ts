import dotenv, { DotenvConfigOutput } from 'dotenv';
import { LoadStrategy, MikroORM, Options } from '@mikro-orm/core';
import { TsMorphMetadataProvider } from '@mikro-orm/reflection/TsMorphMetadataProvider';
import path from 'path';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';
const configResult: DotenvConfigOutput = dotenv.config();
if (configResult.error) {
  throw configResult.error;
}
const rootDir = process.env.NODE_ENV === 'development' ? 'src' : 'build/src';
const extension = process.env.NODE_ENV === 'development' ? 'ts' : 'js';
export default {
  metadataProvider: TsMorphMetadataProvider,
  type: 'postgresql',
  dbName: process.env.DB_NAME,
  debug: false,
  // debug: process.env.NODE_ENV === 'development',
  entities: [rootDir + '/modules/**/domain/*.entity.{js,ts}'],
  host: process.env.DB_HOST,
  migrations: {
    path: path.join(__dirname, '../migrations'), // path to the folder with migrations
    pattern: /^[\w-]+\d+\.[tj]s$/, // regex pattern for the migration files
    tableName: 'migrationsHistory',
    emit: extension,
    transactional: true,
  },
  password: process.env.DB_PASS,
  port: process.env.DB_PORT,
  tsNode: true,
  loadStrategy: LoadStrategy.JOINED,
  user: process.env.DB_USER,
} as Options<PostgreSqlDriver>;
