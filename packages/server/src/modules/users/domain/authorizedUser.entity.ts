import {
  Entity,
  ManyToOne,
  PrimaryKey,
  Property,
  Unique,
} from '@mikro-orm/core';
import { enumFromValue } from '@utils/enumFromValue';
import { validate } from 'uuid';
import { User } from './user.entity';

export enum OS {
  windows = 'windows',
  mac = 'mac',
  x11 = 'x11',
  linux = 'linux',
  android = 'android',
  ios = 'ios',
  random = 'desconhecido',
}
export enum Device {
  chrome = 'chrome',
  firefox = 'fireFox',
  msie = 'msie',
  edge = 'edge',
  safari = 'safari',
  opera = 'opera',
  random = 'desconhecido',
}
export interface authorizedUserContainer {
  user: User;
  ip: string;
  latitude: number | null;
  longitude: number | null;
  os: OS;
  device: Device;
  timezone: string;
  online: boolean;
}

@Entity({ tableName: 'authorized_users' })
@Unique({ properties: ['user', 'ip', 'os', 'device'] })
export class AuthorizedUser {
  @PrimaryKey()
  public id: Number;
  @ManyToOne({
    entity: () => User,
    fieldName: 'user_id',
  })
  public user: User;
  @Property()
  public ip: string;
  @Property()
  public latitude: number | null;
  @Property()
  public longitude: number | null;
  @Property()
  public os: OS;
  @Property()
  public device: Device;
  @Property()
  public timezone: string;
  @Property({ default: false })
  public online: boolean;
  constructor(container: authorizedUserContainer) {
    this.user = container.user;
    this.device = container.device;
    this.ip = container.ip;
    this.latitude = container.latitude;
    this.longitude = container.longitude;
    this.online = container.online;
    this.timezone = container.timezone;
    this.os = container.os;
  }

  public static build = ({
    user,
    device,
    ip,
    latitude,
    longitude,
    os,
    online,
    timezone,
  }: authorizedUserContainer) => {
    const osValue = enumFromValue(os.toLowerCase(), OS);
    const deviceValue = enumFromValue(device.toLowerCase(), Device);
    if (!validate(user.employee.id)) throw new Error(`Invalid Employee UUID`);
    return new AuthorizedUser({
      user,
      os: osValue ? osValue : OS.random,
      device: deviceValue ? deviceValue : Device.random,
      timezone,
      online,
      longitude,
      latitude,
      ip,
    });
  };
}
