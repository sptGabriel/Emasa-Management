import chalk from "chalk";
import { inject, injectable, singleton } from "tsyringe";
import { IDatabaseORM, MikroOrmClient } from "../orm";
import { ExpressServer } from "./httpServer";
import { IHttpServer } from "./server.contract";

export interface BootStrapContainer {
  getHttpServer(): IHttpServer;
  getDatabaseORM():IDatabaseORM
}
@injectable()
@singleton()
export class BootstrapApplication implements BootStrapContainer {
  constructor(@inject(ExpressServer) private HttpServer: IHttpServer,
   @inject(MikroOrmClient) private DatabaseOrm: IDatabaseORM) {
  }
  public getHttpServer = (): IHttpServer => {
    return this.HttpServer
  }
  public getDatabaseORM = (): IDatabaseORM => {
    return this.DatabaseOrm
  }
  public start = async () => {
    console.log(chalk.yellow(`Starting Http Server`))
    await this.HttpServer.start();
    console.log(chalk.yellow(`Http Server started successfully`))
    console.log(chalk.yellow(`Starting Database`))
    await this.DatabaseOrm.start();
    console.log(chalk.yellow(`Database started successfully`))
  };
}