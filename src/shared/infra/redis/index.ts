import { createClient, RedisClient } from 'redis';
export interface IRedis {
  getClient(): RedisClient;
  startRedis(): void;
}
export class RedisServer implements IRedis {
  private client: RedisClient;
  constructor() {}
  public getClient = () => {
    return this.client;
  };
  private createClient = () => {
    if (this.client) return;
    this.client = createClient({ port: 6379, host: '127.0.0.1' });
  };
  public startRedis = () => {
    this.createClient();
    this.client.on('ready', () => {
      console.log('Client connected to redis and ready to use...');
    });
    this.client.on('error', err => {
      console.log(err.message);
    });
    this.client.on('end', () => {
      console.log('Client disconnected from redis');
    });
    process.on('SIGINT', () => {
      this.client.quit();
    });
  };
}
