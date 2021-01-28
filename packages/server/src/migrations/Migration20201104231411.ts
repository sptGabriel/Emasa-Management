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
            table.uuid('id').primary();
            table.uuid('user_id').references('users.id').notNullable();
            table.string('ip').notNullable();
            table.specificType('latitude', 'double precision').notNullable();
            table.specificType('longitude', 'double precision').notNullable();
            table.string('os');
            table.string('device');
            table.string('timezone');
            table.string('continent');
            table.string('country');
            table.string('continent_code');
            table.string('city');
            table.string('principal_subdivision');
            table.string('principal_subdivision_code');
            table.unique(['user_id', 'ip', 'device', 'os'])
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
