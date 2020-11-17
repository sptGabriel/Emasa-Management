import { Migration } from '@mikro-orm/migrations';
export class Migration20201104231205 extends Migration {
  async up(): Promise<void> {
    return this.getKnex()
      .schema.hasTable('equipments')
      .then(exists => {
        if (exists) return;
        return this.getKnex()
          .schema // **** udpate
          .createTable('equipments', async table => {
            table.uuid('id').notNullable().primary();
            table.string('patrimony_code').notNullable().unique();
            table
              .uuid('component_id')
              .references('components.id')
              .notNullable();
            table.uuid('employee_id').references('employees.id').notNullable();
            table.unique(['id', 'patrimony_code']);
            table.timestamp('created_at').defaultTo(this.getKnex().fn.now());
            table.timestamp('updated_at').defaultTo(this.getKnex().fn.now());
            table.timestamp('deleted_at');
          });
      });
  }
  async down(): Promise<void> {
    return this.getKnex().schema.dropTable('equipments');
  }
}
