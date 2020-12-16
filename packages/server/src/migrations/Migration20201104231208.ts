import { Migration } from '@mikro-orm/migrations';
export class Migration20201104231206 extends Migration {
  async up(): Promise<void> {
    return this.getKnex()
      .schema.hasTable('users')
      .then(exists => {
        if (exists) return;
        return this.getKnex()
          .schema // **** udpate
          .createTable('users', async table => {
            table.uuid('employee_id').references('employees.id').primary().notNullable();
            table.string('login').notNullable();
            table.string('password').notNullable();
            table.string('ref_token').defaultTo(null);
            table.boolean('active').notNullable().defaultTo(false);
            table.timestamp('created_at').defaultTo(this.getKnex().fn.now());
            table.timestamp('updated_at').defaultTo(this.getKnex().fn.now());
            table.timestamp('deleted_at');
          });
      });
  }
  async down(): Promise<void> {
    return this.getKnex().schema.dropTable('users');
  }
}
