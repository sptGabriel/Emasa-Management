import { Migration } from '@mikro-orm/migrations';
export class Migration20201104231412 extends Migration {
  async up(): Promise<void> {
    return this.getKnex()
      .schema.hasTable('department_requests')
      .then(exists => {
        if (exists) return;
        return this.getKnex()
          .schema // **** udpate
          .createTable('department_requests', async table => {
            table.increments('id').primary();
            table
            .uuid('departament_id')
            .notNullable()
            .references('departaments.id')
            table
              .string('url')
              .notNullable();
              table
              .integer('code')
              .notNullable();
              table
              .string('method')
              .notNullable();
            table.timestamp('created_at').defaultTo(this.getKnex().fn.now());
          });
      });
  }
  async down(): Promise<void> {
    return this.getKnex().schema.dropTable('department_requests');
  }
}
