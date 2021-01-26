import {
  Cascade,
  Entity,
  OneToOne,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { User } from './user.entity';

export interface profilePictureContainer {
  picture_id: string;
  bytes: number;
  url: string;
}
@Entity({ tableName: 'user_profile_picture' })
export class ProfilePicture {
  @PrimaryKey()
  public readonly picture_id: string;
  @Property()
  public url: string;
  @Property()
  public bytes: number;
  @OneToOne({
    entity: () => User,
    mappedBy: 'picture',
  })
  public user: User;

  constructor(container: profilePictureContainer) {
    this.picture_id = container.picture_id;
    this.bytes = container.bytes;
    this.url = container.url;
  }
  public static build = ({
    bytes,
    picture_id,
    url,
  }: profilePictureContainer) => {
    return new ProfilePicture({ picture_id, bytes, url });
  };
}
