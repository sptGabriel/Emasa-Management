import 'reflect-metadata';
import { container } from 'tsyringe';
import '@shared/container/index';
import { BootstrapApplication, BootStrapContainer, IBootstrap } from './bootstrap';
container.registerSingleton<IBootstrap>(
  'bootstrap',
  BootstrapApplication,
);
(async () => {
  const server = container.resolve<IBootstrap>('bootstrap');
  await server.start();
})();
