import 'reflect-metadata';
import { container } from 'tsyringe';
import '@shared/container/index';
import '@shared/adapters';
import mongoose from 'mongoose';
import mongoConfig from '@config/mongo';
import { BootstrapApplication, IBootstrap } from './bootstrap';
container.registerSingleton<IBootstrap>('bootstrap', BootstrapApplication);
(async () => {
  const mongoUserPass = mongoConfig.username
    ? `${mongoConfig.username}:${mongoConfig.password}@`
    : '';
  const server = container.resolve<IBootstrap>('bootstrap');
  const connection = await mongoose.connect(
    `mongodb://${mongoUserPass}${mongoConfig.host}:${mongoConfig.port}/${mongoConfig.database}`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    },
  );
  //connection.connection.db
  //  .collection('passwordrecoveries')
  //  .createIndex({"expire_at": 1 }, { expireAfterSeconds: 5 } );
  await server.start();
})();
