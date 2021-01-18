import express, { Request, Response } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import { IHttpServer } from './server.contract';
import { ErrorMiddleware } from './middlewares/error.middleware';
import { container } from 'tsyringe';
import { BaseController } from '@shared/core/baseController';
import { expr, RequestContext } from '@mikro-orm/core';
import { EntityManager } from '@mikro-orm/postgresql';
import path from 'path'
const corstOpts = cors({
  credentials: true,
  origin: 'http://localhost:3000',
  methods: ['POST', 'PUT', 'GET', 'OPTIONS', 'HEAD'],
  exposedHeaders: ['eid', 'Access-Token'],
});
export class ExpressServer implements IHttpServer {
  private server: express.Application;
  private em: EntityManager;
  constructor() {
    this.server = express();
  }
  private initializeRouter = () => {
    container.resolveAll<BaseController>('Controllers').forEach(controller => {
      this.server.use('/api/v1', controller.getRouter());
    });
    this.server.get('/favico.ico', (req, res) => {
      res.sendStatus(404);
    });
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
  //cors({
  //  credentials: true,
  //  origin: 'http://localhost:3000',
  //  methods: ['POST', 'PUT', 'GET', 'OPTIONS', 'HEAD'],
  //  exposedHeaders: ['eid', 'Access-Token'],
  //}),
  //save config of cors
  //res.header('Content-Type', 'application/json;charset=UTF-8');
  //    res.header('Access-Control-Allow-Headers', 'Set-Cookie');
  //    //res.setHeader('Access-Control-Allow-Credentials', true);
  //    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  //    res.header(
  //      'Access-Control-Allow-Headers',
  //      'Origin, X-Requested-With, Content-Type, Accept',
  //    );
  //    next();
  private initializeMiddlewares = () => {
    this.server.use(express.json({limit: '50mb'}));
    this.server.use(express.urlencoded({limit: '50mb', extended: true}))
    this.server.use(cookieParser());
    this.server.use(corstOpts);
    this.server.use(function (req, res, next) {
      res.header('Content-Type', 'application/json;charset=UTF-8');
      res.header('Access-Control-Allow-Headers', 'Set-Cookie');
      res.setHeader('Access-Control-Allow-Credentials', "true");
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
      res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept',
      );
      next();
    });
    this.server.use(bodyParser.json());
    this.server.use((req, res, next) => {
      RequestContext.create(this.em, next);
    });
    this.server.use(
      "/files",
      express.static(path.resolve(__dirname, "..", "..", "..", "..", "uploads"))
    );
  };
  public getServer = () => {
    return this.server;
  };
  public start = async () => {
    this.em = container.resolve('EntityManager');
    this.initializeMiddlewares();
    this.initializeRouter();
    this.initializeErrorHandling();
    this.server.listen(4000, '0.0.0.0', () => {
      console.log('this server is ready on port 3000');
    });
  };
  public stop = (): void => {
    throw new Error('Method not implemented.');
  };
}
