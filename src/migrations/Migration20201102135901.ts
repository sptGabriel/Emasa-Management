import { Migration } from '@mikro-orm/migrations';
export class Migration20201102135901 extends Migration {
  async up(): Promise<void> {
    return this.getKnex()
      .schema.hasTable('product_instances')
      .then(exists => {
        if (exists) return;
        return this.getKnex()
          .schema // **** udpate
          .createTable('product_instances', async table => {
            table.uuid('id').notNullable().primary();
            table.string('serial_number', 100).notNullable().unique();
            table.string('patrimony_code', 30).unique();
            table
              .uuid('product_id')
              .notNullable()
              .references('products.id')
              .onUpdate('CASCADE')
              .onDelete('CASCADE');
            table
              .uuid('stock_id')
              .onUpdate('CASCADE')
              .onDelete('NO ACTION')
              .notNullable()
              .references('product_stocks.id');
            table
              .uuid('employee_id')
              .notNullable()
              .references('employees.id')
              .onUpdate('CASCADE')
              .onDelete('NO ACTION');
            table.enu('type', ['component', 'equipament']).notNullable();
            table
              .uuid('parent')
              .references('product_instances.id')
              .onUpdate('CASCADE')
              .onDelete('NO ACTION');
            table.timestamp('created_at').defaultTo(this.getKnex().fn.now());
            table.timestamp('updated_at').defaultTo(this.getKnex().fn.now());
            table.timestamp('deleted_at');
          });
      });
  }
  async down(): Promise<void> {
    return this.getKnex().schema.dropTable('product_instances');
  }
}
