import { Migration } from '@mikro-orm/migrations';
export class Migration20201102135635 extends Migration {
  async up(): Promise<void> {
    return this.getKnex().schema.hasTable('departaments').then( (exists) => {
      if (exists) return;
      return this.getKnex().schema // **** udpate
        .createTable('departaments', table => {
          table.uuid('id').notNullable().primary();
          table.string('departament_name', 100).notNullable().unique();
          table.string('initial_acronyms', 10).notNullable().unique();
          table.timestamp('created_at').defaultTo(this.getKnex().fn.now());
          table.timestamp('updated_at').defaultTo(this.getKnex().fn.now());
          table.timestamp('deleted_at');
        })
    });
  }
  async down():Promise <void> {
    return this.getKnex().schema.dropTable('departaments');
  }
}
