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
              .onUpdate('CASCADE') // if Article primary key is changed, update this foreign key.
              .onDelete('CASCADE');
            table
              .uuid('contract_id')
              .notNullable()
              .references('contracts.id')
              .onUpdate('CASCADE') // if Article primary key is changed, update this foreign key.
              .onDelete('NO ACTION');
            table
              .uuid('employee_id')
              .notNullable()
              .references('employees.id')
              .onUpdate('CASCADE') // if Article primary key is changed, update this foreign key.
              .onDelete('NO ACTION');
            table.enu('type', ['component', 'equipament']).notNullable();
            table
              .uuid('parent')
              .references('product_instances.id')
              .onUpdate('CASCADE') // if Article primary key is changed, update this foreign key.
              .onDelete('NO ACTION');
            table.timestamp('createdAt').defaultTo(this.getKnex().fn.now());
            table.timestamp('updatedAt').defaultTo(this.getKnex().fn.now());
            table.timestamp('deletedAt');
          });
      });
  }
  async down(): Promise<void> {
    return this.getKnex().schema.dropTable('product_instances');
  }
}
