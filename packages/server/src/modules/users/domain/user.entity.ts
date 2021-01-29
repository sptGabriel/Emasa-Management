import {
  Cascade,
  Collection,
  Entity,
  LoadStrategy,
  OneToMany,
  OneToOne,
  Property,
} from '@mikro-orm/core';
import { Employee } from '@modules/employees/domain/employee.entity';
import { validate } from 'uuid';
import { hash, genSaltSync, compareSync } from 'bcryptjs';
import { isHashedRegex } from '@utils/isHashed';
import { ProfilePicture } from './userProfilePicture.entity';
import { AuthorizedUser } from './authorizedUser.entity';
import { moveArrayItem } from '@utils/moveArrayItem';

export interface userContainer {
  employee: Employee;
  login: string;
  password: string;
  ref_token?: string | null;
  picture: ProfilePicture | null;
}

@Entity({ tableName: 'users' })
export class User {
  @OneToOne(() => Employee, employee => employee, {
    owner: true,
    primary: true,
    cascade: [Cascade.PERSIST],
    orphanRemoval: true,
    fieldName: 'id',
  })
  public readonly employee: Employee;
  @Property()
  public login: string;
  @Property()
  public password: string;
  @Property({ default: null })
  public ref_token: string | null;
  @OneToOne(() => ProfilePicture, profile => profile.user, {
    owner: true,
    orphanRemoval: true,
    fieldName: 'picture_id',
  })
  public picture: ProfilePicture | null;
  @OneToMany(() => AuthorizedUser, devices => devices.user, {
    strategy: LoadStrategy.JOINED,
  })
  public authorizedDevices = new Collection<AuthorizedUser>(this);
  @Property({ name: 'devicesInformations', persist: false })
  public get getDevicesInfos(): any {
    const devices: any[] = this.authorizedDevices.getItems();
    if (!(devices.length > 0)) return undefined;
    return devices.map((item: any) => {
      let access = item.lastAccesses.getItems()[item.lastAccesses.length - 1]
        .accessed_at.getTime();
      return {
        device: item.os,
        browser: item.device,
        city: item.city,
        state: item.principalSubdivision,
        country: item.country,
        online: item.online,
        accessTime: access,
      };
    });
  }
  @Property({ name: 'payload', persist: false })
  public get getJWTPayload(): any {
    const devices = this.getDevicesInfos;
    const sortedDevices = moveArrayItem({
      array: devices,
      fromIndex: devices.findIndex((item: any) => item.online),
      toIndex: 0,
    })
    return {
      id: this.employee.id,
      first_name: this.employee.first_name,
      last_name: this.employee.last_name,
      username: this.login,
      email: this.employee.email,
      biografia: this.employee.biografia,
      departament: {
        id: this.employee.departament.id,
        departament_name: this.employee.departament.departament_name,
      },
      login: this.login,
      avatar: this.picture ? `profile_images/${this.picture.picture_id}` : null,
      matricula: this.employee.matricula,
      position: this.employee.position,
      address: this.employee.address.Address,
      devices: sortedDevices,
    };
  }

  constructor(container: userContainer) {
    this.employee = container.employee;
    this.login = container.login;
    this.password = container.password;
    this.picture = container.picture;
    if (container.ref_token) this.ref_token = container.ref_token;
    this.ref_token = null;
  }
  public static DecryptPassword = (plain_pass: string, old_pass: string) => {
    return compareSync(plain_pass, old_pass);
  };
  public static EncryptPassword = async (password: string) => {
    return await hash(password, genSaltSync(10)).catch(err => {
      throw err;
    });
  };
  public static build = async ({
    employee,
    login,
    password,
    ref_token,
    picture,
  }: userContainer) => {
    if (!validate(employee.id)) throw new Error(`Invalid Employee UUID`);
    if (employee.user) throw new Error(`Employee already has user`);
    if (password.length == 60 && password.match(isHashedRegex)) {
      throw new Error(`This password has been encrypted`);
    }
    password = await User.EncryptPassword(password);
    return new User({ employee, login, password, ref_token, picture });
  };
}
