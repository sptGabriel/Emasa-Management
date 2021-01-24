import { Entity, ManyToOne, PrimaryKey, Property, Unique } from '@mikro-orm/core';
import { validate } from 'uuid';
import { User } from './user.entity';

enum OS {
  win = 'wndows',
  mac = 'mac',
  x11 = 'x11',
  linux = 'linux',
  android = 'android',
  ios = 'ios',
  random = 'desconhecido',
}
enum Device {
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
  latitude: Number;
  longitude: Number;
  os: OS;
  device: Device;
  timezone: string;
  online: boolean
}

@Entity({ tableName: 'authorized_users' })
@Unique({ properties: ['user', 'ip', 'os', 'device'] })
export class AuthorizedUser {
  @PrimaryKey()
  public id: Number;
  @ManyToOne({
    entity: () => User,
    fieldName: 'employee_id',
  })
  public user: User;
  @Property()
  public ip: string;
  @Property()
  public latitude: Number;
  @Property()
  public longitude: Number;
  @Property()
  public os: OS;
  @Property()
  public device: Device;
  @Property()
  public timezone: string;
  @Property({default: false})
  public online: boolean;
  constructor(container: authorizedUserContainer) {
    this.user = container.user;
    this.device = container.device;
    this.ip = container.ip;
    this.latitude = container.latitude;
    this.longitude = container.longitude;
    this.online = container.online
    this.timezone = container.timezone
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
    timezone
  }: authorizedUserContainer) => {
    if (!validate(user.employee.id)) throw new Error(`Invalid Employee UUID`);
    if(!(os in OS)) throw new Error(`Invalid OS`)
    if(!(device in Device)) throw new Error(`Problem contact your admin`)
    return new AuthorizedUser({
      user,
      os,
      device,
      timezone,
      online,
      longitude,
      latitude,
      ip,
    });
  };
}
