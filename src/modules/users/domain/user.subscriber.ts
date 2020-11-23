import { User } from './user.entity';
import { hash, genSaltSync } from 'bcryptjs';
import { EventSubscriber, EventArgs, Subscriber } from '@mikro-orm/core';
@Subscriber()
export class UserSubscriber implements EventSubscriber<User> {
  async beforeCreate(args: EventArgs<User>): Promise<void> {}
}
