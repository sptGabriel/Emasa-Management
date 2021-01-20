import { Migration } from '@mikro-orm/migrations';
export class Migration20201104231511 extends Migration {
  async up(): Promise<void> {
    return this.getKnex()
      .schema.hasTable('password_recovery_logs')
      .then(exists => {
        if (exists) return;
        return this.getKnex()
          .schema // **** udpate
          .createTable('password_recovery_logs', async table => {
            table.uuid('employee_id').references('employees.id').notNullable();
            table.string('old_password').notNullable();
            table.string('used_token').notNullable();
            table.string('ip').notNullable();
            table.string('longitude');
            table.string('latitude');
            table.string('timezone');
            table.timestamp('changed_at').defaultTo(this.getKnex().fn.now());
            table.timestamp('deleted_at');
          });
      });
  }
  async down(): Promise<void> {
    return this.getKnex().schema.dropTable('password_recovery_logs');
  }
}
