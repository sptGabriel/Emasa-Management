import { Migration } from '@mikro-orm/migrations';
export class Migration20201102135739 extends Migration {
  async up(): Promise<void> {
    return this.getKnex()
      .schema.hasTable('withdrawal_components')
      .then(exists => {
        if (exists) return;
        return this.getKnex()
          .schema // **** udpate
          .createTable('withdrawal_components', async table => {
            table
              .uuid('withdrawal_id')
              .references('withdrawal.id')
              .notNullable();
              table
              .uuid('component_id')
              .references('components.id')
              .notNullable();
            table.primary(['withdrawal_id', 'component_id']);
            table.timestamp('created_at').defaultTo(this.getKnex().fn.now());
            table.timestamp('updated_at').defaultTo(this.getKnex().fn.now());
            table.timestamp('deleted_at');
          });
      });
  }
  async down(): Promise<void> {
    return this.getKnex().schema.dropTable('withdrawal_components');
  }
}
