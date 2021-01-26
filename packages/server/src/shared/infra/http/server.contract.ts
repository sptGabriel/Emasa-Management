import { Application } from 'express'
export interface IHttpServer {
  init(): void;
  getApp(): Application;
  stop(): void;
}