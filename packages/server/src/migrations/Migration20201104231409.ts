import { Migration } from '@mikro-orm/migrations';
export class Migration20201104231409 extends Migration {
  async up(): Promise<void> {
    return this.getKnex()
      .schema.hasTable('password_recovery')
      .then(exists => {
        if (exists) return;
        return this.getKnex()
          .schema // **** udpate
          .createTable('password_recovery', async table => {
            table.increments('id').primary();
            table
              .uuid('user_id')
              .references('users.id')
              .notNullable();
            table.string('token').notNullable();
            table.boolean('used').notNullable().defaultTo(false);
            table.timestamp('expires_at').notNullable();
          });
      });
  }
  async down(): Promise<void> {
    return this.getKnex().schema.dropTable('password_recovery');
  }
}
