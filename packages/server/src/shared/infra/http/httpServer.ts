import express, { Request, Response } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import { IHttpServer } from './server.contract';
import { ErrorMiddleware } from './middlewares/error.middleware';
import { container } from 'tsyringe';
import { BaseController } from '@shared/core/baseController';
import { RequestContext } from '@mikro-orm/core';
import { EntityManager } from '@mikro-orm/postgresql';
import { serverStatRouter } from './serverStatRouter';
const corstOpts =  cors({
    credentials: true,
    origin: 'http://localhost:3000',
    methods: ['POST', 'PUT', 'GET', 'OPTIONS', 'HEAD'],
    exposedHeaders: ['eid', 'Access-Token'],
  })
export class ExpressServer implements IHttpServer {
  private server: express.Application;
  private em: EntityManager;
  constructor() {
    this.server = express();
  }
  private initializeRouter = () => {
    this.server.use('/api/v1', serverStatRouter);
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
    this.server.use(cookieParser());
    this.server.use(corstOpts);
    this.server.use((req: Request, res: Response, next) => {
      var oneof = false;
      if (req.headers.origin) {
        res.header('Access-Control-Allow-Origin', req.headers.origin);
        oneof = true;
      }
      if (req.headers['access-control-request-method']) {
        res.header(
          'Access-Control-Allow-Methods',
          req.headers['access-control-request-method'],
        );
        oneof = true;
      }
      if (req.headers['access-control-request-headers']) {
        res.header(
          'Access-Control-Allow-Headers',
          req.headers['access-control-request-headers'],
        );
        oneof = true;
      }
      if (oneof) {
        res.header('Access-Control-Max-Age', '60 * 60 * 24 * 365');
      }

      // intercept OPTIONS method
      if (oneof && req.method == 'OPTIONS') {
        res.send(200);
      } else {
        next();
      }
    });
    this.server.use(express.json());
    this.server.use(bodyParser.json());
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
    this.server.listen(4000, '0.0.0.0', () => {
      console.log('this server is ready on port 3000');
    });
  };
  public stop = (): void => {
    throw new Error('Method not implemented.');
  };
}
