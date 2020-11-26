import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import { IHttpServer } from './server.contract';
import { ErrorMiddleware } from './middlewares/error.middleware';
import { container, singleton } from 'tsyringe';
import { BaseController } from '@shared/core/baseController';
import { RequestContext } from '@mikro-orm/core';
import { EntityManager } from '@mikro-orm/postgresql';
export class ExpressServer implements IHttpServer {
  private server: express.Application;
  private em:EntityManager
  constructor() {
    this.server = express();

  }
  private initializeRouter = () => {
    container.resolveAll<BaseController>("Controllers").forEach((controller) => {
      this.server.use(controller.getRouter())
    })
    this.server.get('/favico.ico', (req, res) => {
      res.sendStatus(404);
    });
    this.server.get('/', (req, res) => {
      res.send('Welcome');
    });
  };
  private initializeErrorHandling() {
    this.server.use(ErrorMiddleware);
  }
  private initializeMiddlewares = () => {
    this.server.use(cors());
    this.server.use(express.json());
    this.server.use(bodyParser.json());
    this.server.use(cookieParser());
    this.server.use((req, res, next) => {
      RequestContext.create(this.em, next);
    });
  };
  public getServer = () => {
    return this.server;
  };
  public start = async () => {
    this.em = container.resolve('EntityManager');
    this.initializeMiddlewares();
    this.initializeRouter();
    this.initializeErrorHandling();
    this.server.listen(3000,'0.0.0.0', () => {
      console.log('this server is ready on port 3000');
    });
  };
  public stop = (): void => {
    throw new Error('Method not implemented.');
  };
}
