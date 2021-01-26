import { Migration } from '@mikro-orm/migrations';
export class Migration20201102135634 extends Migration {
  async up(): Promise<void> {
    return this.getKnex()
      .schema.hasTable('locations')
      .then(exists => {
        if (exists) return;
        return this.getKnex()
          .schema // **** udpate
          .createTable('locations', async table => {
            table.uuid('id').notNullable().primary();
            table
              .string('cep', 8)
              .notNullable()
            table.string('cidade', 30).notNullable();
            table.string('rua', 100).notNullable();
            table.string('bairro', 100).notNullable();
            table.string('complemento', 100).notNullable();
            table.integer('numero').notNullable();
              table.timestamp('created_at').defaultTo(this.getKnex().fn.now());
              table.timestamp('updated_at').defaultTo(this.getKnex().fn.now());
              table.timestamp('deleted_at');
          })
      });
  }
  async down(): Promise<void> {
    return this.getKnex().schema.dropTable('locations');
  }
}
