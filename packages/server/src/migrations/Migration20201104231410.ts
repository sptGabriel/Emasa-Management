import { Migration } from '@mikro-orm/migrations';
export class Migration20201104231410 extends Migration {
  async up(): Promise<void> {
    return this.getKnex()
      .schema.hasTable('password_exchange_logs')
      .then(exists => {
        if (exists) return;
        return this.getKnex()
          .schema // **** udpate
          .createTable('password_exchange_logs', async table => {
            table.increments('id').primary();
            table
            .uuid('user_id')
            .references('users.id')
            .notNullable();
            table.string('old_password').notNullable();
            table.string('new_password').notNullable();
            table
            .enu('type', ['default', 'reset-password'])
            .notNullable();
            table.string('ip').notNullable()
            table.integer('latitude');
            table.integer('longitude');
            table.string('os').notNullable();
            table.string('device').notNullable();
            table.timestamp('created_at').defaultTo(this.getKnex().fn.now());
          });
      });
  }
  async down(): Promise<void> {
    return this.getKnex().schema.dropTable('password_exchange_logs');
  }
}
