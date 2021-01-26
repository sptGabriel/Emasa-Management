import { Migration } from '@mikro-orm/migrations';
export class Migration20201102135939 extends Migration {
  async up(): Promise<void> {
    return this.getKnex()
      .schema.hasTable('withdrawal')
      .then(exists => {
        if (exists) return;
        return this.getKnex()
          .schema // **** udpate
          .createTable('withdrawal', async table => {
            table.uuid('id').notNullable().primary();
            table.uuid('by_employee').notNullable();
            table.uuid('to_employee').notNullable();
            table.uuid('to_departament').notNullable();
            table.timestamp('created_at').defaultTo(this.getKnex().fn.now());
            table.timestamp('updated_at').defaultTo(this.getKnex().fn.now());
            table.timestamp('deleted_at');
          });
      });
  }
  async down(): Promise<void> {
    return this.getKnex().schema.dropTable('withdrawal');
  }
}
