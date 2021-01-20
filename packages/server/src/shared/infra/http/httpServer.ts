import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import { IHttpServer } from './server.contract';
import { ErrorMiddleware } from './middlewares/error.middleware';
import { container, inject, injectable } from 'tsyringe';
import { BaseController } from '@shared/core/baseController';
import { RequestContext } from '@mikro-orm/core';
import { EntityManager } from '@mikro-orm/postgresql';
import path from 'path';
import { corsMiddleware } from './middlewares/cors.middleware';
import LoggerProvider from '@shared/adapters/models/LoggerProvider';
import { jwtMiddleware } from './middlewares/jwt.middleware';

const corstOpts = cors({
  credentials: true,
  origin: 'http://localhost:3000',
  methods: ['POST', 'PUT', 'GET', 'OPTIONS', 'HEAD'],
  exposedHeaders: ['eid', 'Access-Token'],
});

@injectable()
export class ExpressServer implements IHttpServer {
  private app: express.Application;
  private em: EntityManager
  constructor(
    @inject('LoggerProvider') private loggerProvider: LoggerProvider
  ) {
  }

  public init = () => {
    this.em = container.resolve('EntityManager');
    this.app = express()
    this.setupExpress();
    this.setupRouters();
    this.app.listen(4000, '0.0.0.0', () => {
      this.loggerProvider.log('info','this server is ready on port 3000');
    });
  };

  private setupExpress = (): void => {
    this.app.use(express.json({ limit: '50mb' }));
    this.app.use(express.urlencoded({ limit: '50mb', extended: true }));
    this.app.use(cookieParser());
    this.app.use(corstOpts);
    this.app.use(corsMiddleware);
    this.app.use(bodyParser.json());
    this.app.use((req: Request, res: Response, next: NextFunction) =>
      RequestContext.create(this.em, next),
    );
    this.app.use(
      '/files',
      express.static(
        path.resolve(__dirname, '..', '..', '..', '..', 'uploads'),
      ),
    );
  };

  private setupRouters = () => {
    container.resolveAll<BaseController>('Controllers').forEach(controller => {
      this.app.use('/api/v1', controller.getRouter());
    });
    this.app.get('/favico.ico', (req:Request, res:Response) => {
      res.sendStatus(404);
    });
    this.app.get('/favico.ico', (req:Request, res:Response) => {
      res.sendStatus(404);
    });
    this.app.get('/', (req:Request, res:Response) => {
      res.send('Welcome');
    });
    this.app.use(ErrorMiddleware);
    this.app.use(jwtMiddleware);
  };
  
  public getApp = () => {
    return this.app;
  };
  
  public stop = (): void => {
    throw new Error('Method not implemented.');
  };
}
