import { inject, injectable, singleton } from 'tsyringe';
import { MikroOrmClient } from './mikro-orm/index';
import { ExpressServer } from './http/httpServer';
import { IHttpServer } from './http/server.contract';
import { IDatabaseORM } from '@shared/core/orm';
import { MongoDB } from './mongoose';

export interface IBootstrap {
  start(): Promise<any>;
  close(): Promise<any>;
}

@injectable()
@singleton()
export class BootstrapApplication implements IBootstrap {
  constructor(
    @inject(MongoDB) private MongoDB: IDatabaseORM,
    @inject(MikroOrmClient) private MikroDB: IDatabaseORM,
    @inject(ExpressServer) private HttpServer: IHttpServer,
  ) {
  }
  public close = () => {
    throw new Error('Method not implemented.');
  }
  public start = async () => {
    await this.MikroDB.connect();
    await this.MongoDB.connect();
    this.HttpServer.init();
  };
}
