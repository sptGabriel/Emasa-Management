import { Cascade, Entity, OneToOne, Property } from '@mikro-orm/core';
import { isIPv4 } from 'net'
import { User } from './user.entity';
export interface alLowedIpsContainer {
  user: User;
  ip_address: string;
  valid: boolean;
}
@Entity({ tableName: 'allowed_user_ipsv4' })
export class AllowedUserIPV4 {
  @OneToOne(() => User, user => user, {
    owner: true,
    primary: true,
    cascade: [Cascade.ALL],
    orphanRemoval: true,
    fieldName: 'employee_id',
  })
  public readonly user: User;
  @Property()
  public ip_address: string;
  @Property()
  public valid: boolean;
  constructor(container: alLowedIpsContainer) {
    this.ip_address = container.ip_address;
    this.valid = container.valid;
    this.user = container.user;
  }
  public static build = async ({ ip_address, valid, user }: alLowedIpsContainer) => {
    if(!isIPv4(ip_address)) throw new Error(`Invalid IP Address`);
    if(!(user instanceof User)) throw new Error(`Invalid User`)
    return new AllowedUserIPV4({ ip_address, user, valid: valid ? valid : false });
  };
}
