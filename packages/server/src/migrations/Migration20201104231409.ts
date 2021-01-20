import { Migration } from '@mikro-orm/migrations';
export class Migration20201104231510 extends Migration {
  async up(): Promise<void> {
    return this.getKnex()
      .schema.hasTable('lastusers_access')
      .then(exists => {
        if (exists) return;
        return this.getKnex()
          .schema // **** udpate
          .createTable('lastusers_access', async table => {
            table
              .uuid('access_user_id')
              .references('authorized_user_devices.id')
              .notNullable();
            table.timestamp('accessed_at').defaultTo(this.getKnex().fn.now());
          });
      });
  }
  async down(): Promise<void> {
    return this.getKnex().schema.dropTable('lastusers_access');
  }
}
