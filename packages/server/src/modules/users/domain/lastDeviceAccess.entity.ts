import { Entity, ManyToOne, Property } from '@mikro-orm/core';
import { AuthorizedUser } from './authorizedUser.entity';

export interface lastDeviceAccessContainer {
  authorizedUser: AuthorizedUser;
}

@Entity({ tableName: 'last_device_accesses' })
export class LastDeviceAccess {
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

  public static build = ({ authorizedUser }: lastDeviceAccessContainer) => {
    if (!(authorizedUser instanceof AuthorizedUser))
      throw new Error(`Invalid Device Instance`);
    return new LastDeviceAccess({
      authorizedUser,
    });
  };
}
