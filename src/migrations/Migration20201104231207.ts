import { Migration } from '@mikro-orm/migrations';
export class Migration20201104231206 extends Migration {
  async up(): Promise<void> {
    return this.getKnex()
      .schema.hasTable('transfer_components_logs')
      .then(exists => {
        if (exists) return;
        return this.getKnex()
          .schema // **** udpate
          .createTable('transfer_components_logs', async table => {
            table.integer('id').primary().notNullable();
            table.string('component_id').notNullable();
            table.string('new_departament').notNullable();
            table.string('old_departament').notNullable();
            table.text('description').notNullable();
            table.timestamp('created_at').defaultTo(this.getKnex().fn.now());
            table.timestamp('updated_at').defaultTo(this.getKnex().fn.now());
            table.timestamp('deleted_at');
          });
      });
  }
  async down(): Promise<void> {
    return this.getKnex().schema.dropTable('transfer_components_logs');
  }
}
