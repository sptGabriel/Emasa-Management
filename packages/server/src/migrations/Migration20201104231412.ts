import { Migration } from '@mikro-orm/migrations';
export class Migration20201104231412 extends Migration {
  async up(): Promise<void> {
    return this.getKnex()
      .schema.hasTable('last_device_accesses')
      .then(exists => {
        if (exists) return;
        return this.getKnex()
          .schema // **** udpate
          .createTable('last_device_accesses', async table => {
            table.increments('id').primary();
            table
              .integer('userdevice_id')
              .references('authorized_users.id')
              .notNullable();
            table.timestamp('accessed_at').defaultTo(this.getKnex().fn.now());
          });
      });
  }
  async down(): Promise<void> {
    return this.getKnex().schema.dropTable('last_device_accesses');
  }
}
