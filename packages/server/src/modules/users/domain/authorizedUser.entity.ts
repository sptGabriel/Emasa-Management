import { Entity, ManyToOne, PrimaryKey, Property, Unique } from '@mikro-orm/core';
import { Employee } from '@modules/employees/domain/employee.entity';
import { validate } from 'uuid';

enum OS {
  win = 'Windows',
  mac = 'Mac',
  x11 = 'X11',
  linux = 'Linux',
  android = 'Android',
  ios = 'IOS',
  random = 'Desconhecido',
}
enum Device {
  chrome = 'Chrome',
  firefox = 'FireFox',
  msie = 'MSIE',
  edge = 'Edge',
  safari = 'Safari',
  opera = 'Opera',
  random = 'Desconhecido',
}
export interface authorizedUserContainer {
  employee: Employee;
  ip: string;
  latitude: Number;
  longitude: Number;
  os: OS;
  device: Device;
  timezone: string;
  online: boolean
}

@Entity({ tableName: 'authorized_users' })
@Unique({ properties: ['employee', 'ip', 'os', 'device'] })
export class AuthorizedUser {
  @PrimaryKey()
  public id: Number;
  @ManyToOne({
    entity: () => Employee,
    fieldName: 'employee_id',
  })
  public employee: Employee;
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
    this.employee = container.employee;
    this.device = container.device;
    this.ip = container.ip;
    this.latitude = container.latitude;
    this.longitude = container.longitude;
    this.online = container.online
    this.timezone = container.timezone
    this.os = container.os;
  }

  public static build = ({
    employee,
    device,
    ip,
    latitude,
    longitude,
    os,
    online,
    timezone
  }: authorizedUserContainer) => {
    if (!validate(employee.id)) throw new Error(`Invalid Employee UUID`);
    if(!(os in OS)) throw new Error(`Invalid OS`)
    if(!(device in Device)) throw new Error(`Problem contact your admin`)
    return new AuthorizedUser({
      employee,
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
