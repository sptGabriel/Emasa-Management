import { Migration } from '@mikro-orm/migrations';
export class Migration20201104231209 extends Migration {
  async up(): Promise<void> {
    return this.getKnex()
      .schema.hasTable('lastaccess_users')
      .then(exists => {
        if (exists) return;
        return this.getKnex()
          .schema // **** udpate
          .createTable('lastaccess_users', async table => {
            table.uuid('employee_id').primary().notNullable();
            table.string('ip_address');
            table.timestamp('accessed_at').defaultTo(this.getKnex().fn.now());
          });
      });
  }
  async down(): Promise<void> {
    return this.getKnex().schema.dropTable('lastaccess_users');
  }
}
