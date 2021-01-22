import { Migration } from '@mikro-orm/migrations';
export class Migration20201104231411 extends Migration {
  async up(): Promise<void> {
    return this.getKnex()
      .schema.hasTable('authorized_users')
      .then(exists => {
        if (exists) return;
        return this.getKnex()
          .schema // **** udpate
          .createTable('authorized_users', async table => {
            table.uuid('employee_id').references('employees.id').notNullable();
            table.string('ip').notNullable();
            table.integer('latitude');
            table.integer('longitude');
            table.string('os');
            table.string('device');
            table.string('timezone');
            table.unique(['employee_id', 'ip', 'device', 'os'])
            table.boolean('online').defaultTo(false);
            table.timestamp('created_at').defaultTo(this.getKnex().fn.now());
            table.timestamp('updated_at').defaultTo(this.getKnex().fn.now());
            table.timestamp('deleted_at');
          });
      });
  }
  async down(): Promise<void> {
    return this.getKnex().schema.dropTable('authorized_users');
  }
}
