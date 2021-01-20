import { Migration } from '@mikro-orm/migrations';
export class Migration20201104231512 extends Migration {
  async up(): Promise<void> {
    return this.getKnex()
      .schema.hasTable('password_change_logs')
      .then(exists => {
        if (exists) return;
        return this.getKnex()
          .schema // **** udpate
          .createTable('password_change_logs', async table => {
            table
            .uuid('access_user_id')
            .references('authorized_user_devices.id')
            .primary()
            .notNullable();
            table.uuid('employee_id').references('employees.id').notNullable();
            table.string('old_password').notNullable();
            table.string('new_password').notNullable();
            table.timestamp('changed_at').defaultTo(this.getKnex().fn.now());
            table.timestamp('deleted_at');
          });
      });
  }
  async down(): Promise<void> {
    return this.getKnex().schema.dropTable('password_change_logs');
  }
}
