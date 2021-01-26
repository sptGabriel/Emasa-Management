import 'dotenv/config';
import 'reflect-metadata';
import { container } from 'tsyringe';
import '@shared/adapters';
import '@shared/container/index';
import ProcessQueueService from '@modules/queue/application/useCases/processQueue';

const processQueue = container.resolve(ProcessQueueService);

processQueue.execute();

console.log('⚗‎‎  Processing mail sending queue!');
