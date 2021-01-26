import { Migration } from '@mikro-orm/migrations';
export class Migration20201102135739 extends Migration {

  async up(): Promise<void> {
    return this.getKnex().schema.hasTable('suppliers').then( (exists) => {
      if (exists) return;
      return this.getKnex().schema // **** udpate
        .createTable('suppliers', async table => {
          table.uuid('id').notNullable().primary();
          table.string('cnpj', 100).unique().notNullable();
          table.string('supplier_name', 100);
          table.string('supplier_email', 100);
          table.string('supplier_phone', 100);
          table.string('description', 100);
          table.timestamp('created_at').defaultTo(this.getKnex().fn.now());
          table.timestamp('updated_at').defaultTo(this.getKnex().fn.now());
          table.timestamp('deleted_at');
        })
    });
  }
  async down():Promise <void> {
    return this.getKnex().schema.dropTable('suppliers');
  }
}
