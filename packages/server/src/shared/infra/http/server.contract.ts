import { Application } from 'express'
export interface IHttpServer {
  start(): void;
  getServer(): Application;
  stop(): void;
}