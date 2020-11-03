import { Migration } from '@mikro-orm/migrations';

export class Migration20201102135859 extends Migration {
  async up(): Promise<void> {
    return this.getKnex()
      .schema.hasTable('products')
      .then(exists => {
        if (exists) return;
        return this.getKnex()
          .schema // **** udpate
          .createTable('products', async table => {
            table.uuid('id').notNullable().primary();
            table.string('name', 100).notNullable();
            table.string('codReference', 100).notNullable();
            table
              .uuid('category_id')
              .notNullable()
              .references('product_categories.id')
              .onUpdate('CASCADE') // if Article primary key is changed, update this foreign key.
              .onDelete('NO ACTION');
            table.timestamp('createdAt').defaultTo(this.getKnex().fn.now());
            table.timestamp('updatedAt').defaultTo(this.getKnex().fn.now());
            table.timestamp('deletedAt');
          });
      });
  }
  async down(): Promise<void> {
    return this.getKnex().schema.dropTable('products');
  }
}
