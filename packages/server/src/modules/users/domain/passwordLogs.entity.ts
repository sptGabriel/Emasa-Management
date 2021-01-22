import { Entity, ManyToOne, PrimaryKey, Property } from '@mikro-orm/core';
import { Employee } from '@modules/employees/domain/employee.entity';
import { validate } from 'uuid';

enum LOGTYPE {
  default = 'default',
  resetpwd = 'reset-password',
}
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
export interface pwdLogsContainer {
  employee: Employee;
  type: LOGTYPE;
  old_password: string;
  new_password: string;
  ip: string;
  latitude: Number;
  longitude: Number;
  os: OS;
  device: Device;
}

@Entity({ tableName: 'password_exchange_logs' })
export class PasswordLogs {
  @PrimaryKey()
  public id: Number;
  @ManyToOne({
    entity: () => Employee,
    fieldName: 'employee_id',
  })
  public employee: Employee;
  @Property()
  public old_password: string;
  @Property()
  public new_password: string;
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
  constructor(container: pwdLogsContainer) {
    this.employee = container.employee;
    this.device = container.device;
    this.ip = container.ip;
    this.latitude = container.latitude;
    this.longitude = container.longitude;
    this.new_password = container.new_password;
    this.old_password = container.old_password;
    this.os = container.os;
  }

  public static build = ({
    employee,
    type,
    device,
    ip,
    latitude,
    longitude,
    new_password,
    old_password,
    os,
  }: pwdLogsContainer) => {
    if (!validate(employee.id)) throw new Error(`Invalid Employee UUID`);
    if(!(os in OS)) throw new Error(`Invalid OS`)
    if(!(device in Device)) throw new Error(`Problem contact your admin`)
    return new PasswordLogs({
      employee,
      type,
      os,
      device,
      old_password,
      new_password,
      longitude,
      latitude,
      ip,
    });
  };
}
