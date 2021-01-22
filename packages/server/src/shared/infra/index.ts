import 'reflect-metadata';
import { container } from 'tsyringe';
import '@shared/container/index';
import '@shared/adapters';
import { IBootstrap } from './bootstrap';

(async () => {
  const server = container.resolve<IBootstrap>('bootstrap');
  await server.start();
})()
