import { inject, injectable, singleton } from 'tsyringe';
import { MikroOrmClient } from './mikro-orm/index';
import { ExpressServer } from './http/httpServer';
import { IHttpServer } from './http/server.contract';
import { IDatabaseORM } from '@shared/core/orm';

export interface IBootstrap {
  start(): Promise<any>;
  close(): Promise<any>;
}

@injectable()
@singleton()
export class BootstrapApplication implements IBootstrap {
  constructor(
    @inject('mikroorm') private MikroDB: IDatabaseORM,
    @inject('express') private HttpServer: IHttpServer,
  ) {
  }
  public close = () => {
    throw new Error('Method not implemented.');
  }

  public start = async () => {
    await this.MikroDB.connect();
    this.HttpServer.init();
  };
}
