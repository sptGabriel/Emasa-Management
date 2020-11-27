import { Employee } from './employee.entity';
import { hash, genSaltSync } from 'bcryptjs';
import { EventSubscriber, EventArgs, Subscriber } from '@mikro-orm/core';
@Subscriber()
export class EmployeeSubscriber implements EventSubscriber<Employee> {
  async beforeCreate(args: EventArgs<Employee>): Promise<void> {
    // args.entity.user.password = await hash(
    //   args.entity.user.password,
    //   genSaltSync(10),
    // );
  }
}
