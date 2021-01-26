import { Migration } from '@mikro-orm/migrations';
export class Migration20201102135839 extends Migration {
  async up(): Promise<void> {
    return this.getKnex()
      .schema.hasTable('contracts')
      .then(exists => {
        if (exists) return;
        return this.getKnex()
          .schema // **** udpate
          .createTable('contracts', async table => {
            table.uuid('id').notNullable().primary();
            table.string('name', 100);
            table.string('signature', 100);
            table.timestamp('created_at').defaultTo(this.getKnex().fn.now());
            table.timestamp('updated_at').defaultTo(this.getKnex().fn.now());
            table.timestamp('deleted_at');
          });
      });
  }
  async down(): Promise<void> {
    return this.getKnex().schema.dropTable('contracts');
  }
}
