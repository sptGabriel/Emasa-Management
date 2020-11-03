import { Migration } from '@mikro-orm/migrations';
export class Migration20201102135900 extends Migration {
  async up(): Promise<void> {
    return this.getKnex().schema.hasTable('contracts').then( (exists) => {
      if (exists) return;
      return this.getKnex().schema // **** udpate
      .createTable('contracts', async table => {
        table.uuid('id').notNullable().primary();
        table.uuid('supply_id').references('supplying.id');
        table.string('name', 100);
        table.string('signature', 100);
        table.timestamp('createdAt').defaultTo(this.getKnex().fn.now());
        table.timestamp('updatedAt').defaultTo(this.getKnex().fn.now());
        table.timestamp('deletedAt');
      })
    });
  }
  async down():Promise <void> {
    return this.getKnex().schema.dropTable('contracts');
  }
}