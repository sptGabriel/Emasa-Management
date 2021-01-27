import { Entity, ManyToOne, PrimaryKey, Property } from '@mikro-orm/core';
import { Employee } from '@modules/employees/domain/employee.entity';
import { enumFromValue } from '@utils/enumFromValue';
import { v4, validate } from 'uuid';
import { Device, OS } from './authorizedUser.entity';
import { User } from './user.entity';

export enum LOGTYPE {
  default = 'default',
  resetpwd = 'reset-password',
}
export interface pwdLogsContainer {
  id?: string;
  user: User;
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
  public id: string;
  @ManyToOne({
    entity: () => User,
    fieldName: 'user_id',
  })
  public user: User;
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
  @Property()
  public type: LOGTYPE;
  constructor(container: pwdLogsContainer) {
    this.user = container.user;
    this.device = container.device;
    this.ip = container.ip;
    this.latitude = container.latitude;
    this.longitude = container.longitude;
    this.new_password = container.new_password;
    this.old_password = container.old_password;
    this.os = container.os;
    this.type = container.type;
    this.id = container.id ? container.id : v4();
  }

  public static build = ({
    user,
    type,
    device,
    ip,
    latitude,
    longitude,
    new_password,
    old_password,
    os,
    id
  }: pwdLogsContainer) => {
    if (!validate(user.employee.id)) throw new Error(`Invalid Employee UUID`);
    if (id && !validate(id)) throw new Error(`Invalid Logs UUID`);
    return new PasswordLogs({
      user,
      type:
        type in LOGTYPE
          ? enumFromValue(type.toLowerCase(), LOGTYPE)
          : LOGTYPE.default,
      os: os in OS ? enumFromValue(os.toLowerCase(), OS) : OS.random,
      device:
        device in Device
          ? enumFromValue(device.toLowerCase(), Device)
          : Device.random,
      old_password,
      new_password,
      longitude,
      latitude,
      ip,
      id,
    });
  };
}
