import { Migration } from '@mikro-orm/migrations';
export class Migration20201102135858 extends Migration {
  async up(): Promise<void> {
    return this.getKnex().schema.hasTable('product_categories').then( (exists) => {
      if (exists) return;
      return this.getKnex().schema // **** udpate
      .createTable('product_categories', async table => {
        table.uuid('id').notNullable().primary();
        table.uuid('parent_id').references('product_categories.id');
        table.string('name', 100);
        table.timestamp('createdAt').defaultTo(this.getKnex().fn.now());
        table.timestamp('updatedAt').defaultTo(this.getKnex().fn.now());
        table.timestamp('deletedAt');
      })
    });
  }
  async down():Promise <void> {
    return this.getKnex().schema.dropTable('product_categories');
  }
}
