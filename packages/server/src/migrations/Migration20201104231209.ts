import { Migration } from '@mikro-orm/migrations';
export class Migration20201104231209 extends Migration {
  async up(): Promise<void> {
    return this.getKnex()
      .schema.hasTable('authorized_user_devices')
      .then(exists => {
        if (exists) return;
        return this.getKnex()
          .schema // **** udpate
          .createTable('authorized_user_devices', async table => {
            table.uuid('id').primary().notNullable();
            table.uuid('employee_id').references('employees.id').notNullable();
            table.string('ip').unique('ip_name').notNullable();
            table.string('longitude');
            table.string('latitude');
            table.string('timezone');
            table.boolean('online').defaultTo(false);
            table.timestamp('created_at').defaultTo(this.getKnex().fn.now());
            table.timestamp('updated_at').defaultTo(this.getKnex().fn.now());
            table.timestamp('deleted_at');
          });
      });
  }
  async down(): Promise<void> {
    return this.getKnex().schema.dropTable('authorized_user_devices');
  }
}

//import { Migration } from '@mikro-orm/migrations';
//export class Migration20201104231209 extends Migration {
//  async up(): Promise<void> {
//    return this.getKnex()
//      .schema.hasTable('ipv4_access_status')
//      .then(exists => {
//        if (exists) return;
//        return this.getKnex()
//          .schema // **** udpate
//          .createTable('ipv4_access_status', async table => {
//            table.uuid('employee_id').notNullable()
//            table.string('ip_address').notNullable();
//            table.boolean('active').defaultTo(false);
//            table.unique(['employee_id', 'ip_address'])
//            table.timestamp('created_at').defaultTo(this.getKnex().fn.now());
//            table.timestamp('updated_at').defaultTo(this.getKnex().fn.now());
//            table.timestamp('deleted_at');
//          });
//      });
//  }
//  async down(): Promise<void> {
//    return this.getKnex().schema.dropTable('ipv4_access_status');
//  }
//}
