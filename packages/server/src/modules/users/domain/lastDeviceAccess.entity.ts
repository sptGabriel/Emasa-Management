import { Entity, ManyToOne, PrimaryKey, Property } from '@mikro-orm/core';
import { validate } from 'uuid';
import { AuthorizedUser } from './authorizedUser.entity';

export interface lastDeviceAccessContainer {
  authorizedUser: AuthorizedUser;
  id?: string;
}

@Entity({ tableName: 'last_device_accesses' })
export class LastDeviceAccess {
  @PrimaryKey()
  public id: string;
  @ManyToOne({
    entity: () => AuthorizedUser,
    fieldName: 'userdevice_id',
  })
  public authorizedUser: AuthorizedUser;
  @Property()
  public accessed_at: Date;
  constructor(container: lastDeviceAccessContainer) {
    this.authorizedUser = container.authorizedUser;
    this.accessed_at = new Date();
  }

  public static build = ({ authorizedUser, id }: lastDeviceAccessContainer) => {
    if (!(authorizedUser instanceof AuthorizedUser))
      throw new Error(`Invalid Device Instance`);
    if (id && !validate(id)) throw new Error(`Invalid User Last Access UUID`);
    return new LastDeviceAccess({
      authorizedUser,id
    });
  };
}
