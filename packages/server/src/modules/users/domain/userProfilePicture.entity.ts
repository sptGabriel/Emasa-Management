import {
  Cascade,
  Entity,
  OneToOne,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { v4, validate } from 'uuid';
import { User } from './user.entity';

export interface profilePictureContainer {
  picture_id?: string;
  key: string;
  name: string;
  size: number;
  url: string;
}
@Entity({ tableName: 'user_profile_picture' })
export class ProfilePicture {
  @PrimaryKey()
  public readonly picture_id: string;
  @Property()
  public key: string;
  @Property()
  public name: string;
  @Property()
  public url: string;
  @Property()
  public size: number;
  @OneToOne({
    entity: () => User,
    mappedBy: 'picture',
  })
  public user: User;

  constructor(container: profilePictureContainer) {
    this.picture_id = container.picture_id ? container.picture_id : v4();
    this.key = container.key;
    this.name = container.name;
    this.size = container.size;
    this.url = container.url;
  }
  public static build = ({
    key,
    name,
    size,
    picture_id,
    url,
  }: profilePictureContainer) => {
    if (picture_id && !validate(picture_id))
      throw new Error(`Invalid Employee UUID`);
    return new ProfilePicture({ picture_id, size, name, key, url });
  };
}
