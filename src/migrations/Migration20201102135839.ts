import { Migration } from '@mikro-orm/migrations';
export class Migration20201102135739 extends Migration {

  async up(): Promise<void> {
    return this.getKnex().schema.hasTable('supplying').then( (exists) => {
      if (exists) return;
      return this.getKnex().schema // **** udpate
        .createTable('supplying', async table => {
          table.uuid('id').notNullable().primary();
          table.uuid('supplier_id').notNullable().references('suppliers.id');
          table.boolean('arrived').defaultTo(false);
          table.timestamp('orderedAt').notNullable();
          table.timestamp('arrivesAt').notNullable();
          table.timestamp('created_at').defaultTo(this.getKnex().fn.now());
          table.timestamp('updated_at').defaultTo(this.getKnex().fn.now());
          table.timestamp('deleted_at');
        })
    });
  }
  async down():Promise <void> {
    return this.getKnex().schema.dropTable('supplying');
  }
}
