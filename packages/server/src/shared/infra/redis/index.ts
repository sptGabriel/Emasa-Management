import { createClient, RedisClient } from 'redis';

export interface IRedis {
  getClient(): RedisClient;
  startRedis(): void;
  setKeyWithEX(key: string, value: string, time: number): Promise<any>;
  setKeyValue(key: string, value: string): Promise<any>;
  getValueFromKey(key: string): Promise<any>;
  deleteKey(key: string): Promise<any>;
}
export class RedisServer implements IRedis {
  private client: RedisClient;
  constructor() {}
  public getClient = () => {
    return this.client;
  };
  public setKeyWithEX = (key: string, value: string, time: number) => {
    return new Promise<any>((resolve, reject) => {
      this.client.set(key, value, 'EX', time, (err, reply) => {
        if (err) reject(err);
        if (!reply) reject(false);
        resolve(reply);
      });
    });
  };
  public setKeyValue = (key: string, value: string) => {
    return new Promise<any>((resolve, reject) => {
      this.client.set(key, value, (err, reply) => {
        if (err) reject(err);
        if (!reply) reject(false);
        resolve(reply);
      });
    });
  };
  public getValueFromKey = (key: string) => {
    return new Promise((resolve, reject) => {
      this.client.get(key, (err, data) => {
        if (err) reject(err);
        if (!data) reject(data);
        resolve(data);
      });
    });
  };
  public deleteKey = (key: string) => {
    return new Promise<boolean>((resolve, reject) => {
      this.client.del(key, (err, data) => {
        if (err) reject(err);
        if (!data) reject(false);
        resolve(true);
      });
    });
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
