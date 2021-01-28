import {
  Collection,
  Entity,
  LoadStrategy,
  ManyToOne,
  OneToMany,
  PrimaryKey,
  Property,
  Unique,
} from '@mikro-orm/core';
import { enumFromValue } from '@utils/enumFromValue';
import Big from 'big.js';
import { v4, validate } from 'uuid';
import { LastDeviceAccess } from './lastDeviceAccess.entity';
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
  id?: string;
  user: User;
  ip: string;
  latitude: Big | null;
  longitude: Big | null;
  os: OS;
  city: string | null;
  country: string | null;
  principalSubdivision: string | null;
  principalSubdivisionCode: string | null;
  continent: string | null;
  continentCode: string | null;
  device: Device;
  timezone: string;
  online: boolean;
}

@Entity({ tableName: 'authorized_users' })
@Unique({ properties: ['user', 'ip', 'os', 'device'] })
export class AuthorizedUser {
  @PrimaryKey()
  public id: string;
  @ManyToOne({
    entity: () => User,
    fieldName: 'user_id',
  })
  public user: User;
  @Property()
  public ip: string;
  @Property()
  public latitude: Big | null;
  @Property()
  public longitude: Big | null;
  @Property()
  public city: string | null;
  @Property()
  public country: string | null;
  @Property()
  public continent: string | null;
  @Property()
  public continentCode: string | null;
  @Property()
  public principalSubdivision: string | null;
  @Property()
  public principalSubdivisionCode: string | null;
  @Property()
  public os: OS;
  @Property()
  public device: Device;
  @Property()
  public timezone: string;
  @Property({ default: false })
  public online: boolean;
  @OneToMany(() => LastDeviceAccess, access => access.authorizedUser, {strategy: LoadStrategy.JOINED,})
  public lastAccesses = new Collection<LastDeviceAccess>(this);
  constructor(container: authorizedUserContainer) {
    this.user = container.user;
    this.device = container.device;
    this.ip = container.ip;
    this.latitude = container.latitude;
    this.longitude = container.longitude;
    this.online = container.online;
    this.timezone = container.timezone;
    this.city = container.city;
    this.continent = container.continent;
    this.country = container.country;
    this.continentCode = container.continentCode;
    this.os = container.os;
    this.principalSubdivision = container.principalSubdivision;
    this.principalSubdivisionCode = container.principalSubdivisionCode;
    this.id = container.id ? container.id : v4();
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
    id,
    city,
    continent,
    continentCode,
    country,
    principalSubdivision,
    principalSubdivisionCode,
  }: authorizedUserContainer) => {
    const osValue = enumFromValue(os.toLowerCase(), OS);
    const deviceValue = enumFromValue(device.toLowerCase(), Device);
    if (!validate(user.employee.id)) throw new Error(`Invalid Employee UUID`);
    return new AuthorizedUser({
      principalSubdivision,
      principalSubdivisionCode,
      user,
      city,
      continent,
      continentCode,
      country,
      os: osValue ? osValue : OS.random,
      device: deviceValue ? deviceValue : Device.random,
      timezone,
      online,
      longitude,
      latitude,
      ip,
      id,
    });
  };
}
