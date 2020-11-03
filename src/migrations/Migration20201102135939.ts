import { Migration } from '@mikro-orm/migrations';
export class Migration20201102135739 extends Migration {
  async up(): Promise<void> {
    return this.getKnex().schema.hasTable('withdrawal').then( (exists) => {
      if (exists) return;
      return this.getKnex().schema // **** udpate
      .createTable('withdrawal', async table => {
        table.uuid('id').notNullable().primary();
        table.uuid('by_employee').notNullable().references('employees.id');
        table.uuid('to_employee').notNullable().references('employees.id');
        table.timestamp('createdAt').defaultTo(this.getKnex().fn.now());
        table.timestamp('updatedAt').defaultTo(this.getKnex().fn.now());
        table.timestamp('deletedAt');
      })
    });
  }
  async down():Promise <void> {
    return this.getKnex().schema.dropTable('withdrawal');
  }
}
