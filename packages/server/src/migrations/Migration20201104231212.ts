import { Migration } from '@mikro-orm/migrations';
export class Migration20201104231212 extends Migration {
  async up(): Promise<void> {
    return this.getKnex()
      .schema.hasTable('user_profile_picture')
      .then(exists => {
        if (exists) return;
        return this.getKnex()
          .schema // **** udpate
          .createTable('user_profile_picture', async table => {
            table
              .uuid('picture_id')
              .notNullable().primary();
            table.string('url').notNullable();
            table.integer('bytes').notNullable();
            table.timestamp('created_at').defaultTo(this.getKnex().fn.now());
            table.timestamp('deleted_at');
          });
      });
  }
  async down(): Promise<void> {
    return this.getKnex().schema.dropTable('user_profile_picture');
  }
}
