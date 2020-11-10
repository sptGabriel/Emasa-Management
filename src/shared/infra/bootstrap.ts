import chalk from "chalk";
import { delay, inject, injectable, singleton } from "tsyringe";
import { IDatabaseORM, MikroOrmClient } from "./orm";
import { ExpressServer } from "./http/httpServer";
import { IHttpServer } from "./http/server.contract";

export interface IBootstrap {
  getHttpServer(): IHttpServer;
  getDatabaseORM():IDatabaseORM
  start():void
}

export interface BootStrapContainer {
  getHttpServer(): IHttpServer;
  getDatabaseORM():IDatabaseORM
}
@injectable()
@singleton()
export class BootstrapApplication implements BootStrapContainer {
  constructor(@inject(MikroOrmClient) private DatabaseOrm: IDatabaseORM,
  @inject(ExpressServer) private HttpServer: IHttpServer,) {
  }
  public getHttpServer = (): IHttpServer => {
    return this.HttpServer
  }
  public getDatabaseORM = (): IDatabaseORM => {
    return this.DatabaseOrm
  }
  public start = async () => {
    console.log(chalk.yellow(`Starting Database`))
    await this.DatabaseOrm.start();
    console.log(chalk.yellow(`Database started successfully`))
    console.log(chalk.yellow(`Starting Http Server`))
    await this.HttpServer.start();
    console.log(chalk.yellow(`Http Server started successfully`))
  };
}