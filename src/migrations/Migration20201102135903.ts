import { Migration } from '@mikro-orm/migrations';
export class Migration20201102135903 extends Migration {
  async up(): Promise<void> {
    return this.getKnex().schema.hasTable('supplied_products').then( (exists) => {
      if (exists) return;
      return this.getKnex().schema // **** udpate
      .createTable('supplied_products', async table => {
        table.uuid('supply_id').references('supplying.id').notNullable();
        table.uuid('product_id').references('products.id').notNullable();
        table.unique(['supply_id', 'product_id']);
        table.integer('quantity').notNullable();
        table.timestamp('createdAt').defaultTo(this.getKnex().fn.now());
        table.timestamp('updatedAt').defaultTo(this.getKnex().fn.now());
        table.timestamp('deletedAt');
      })
    });
  }
  async down():Promise <void> {
    return this.getKnex().schema.dropTable('supplied_products');
  }
}
