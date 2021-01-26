import { Migration } from '@mikro-orm/migrations';
export class Migration20201102135740 extends Migration {
  async up(): Promise<void> {
    return this.getKnex()
      .schema.hasTable('supplies')
      .then(exists => {
        if (exists) return;
        return this.getKnex()
          .schema // **** udpate
          .createTable('supplies', async table => {
            table.uuid('id').notNullable().primary();
            table.uuid('supplier_id').notNullable().references('suppliers.id');
            table
              .uuid('contract_id')
              .notNullable()
              .references('contracts.id')
              .unique();
            table.double('total_amount').notNullable()
            table.boolean('arrived').defaultTo(false);
            table.timestamp('ordered_at').notNullable();
            table.timestamp('arrives_at').notNullable();
            table.timestamp('created_at').defaultTo(this.getKnex().fn.now());
            table.timestamp('updated_at').defaultTo(this.getKnex().fn.now());
            table.timestamp('deleted_at');
          });
      });
  }
  async down(): Promise<void> {
    return this.getKnex().schema.dropTable('supplying');
  }
}
