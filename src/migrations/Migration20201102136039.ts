import { Migration } from '@mikro-orm/migrations';
export class Migration20201102135739 extends Migration {
  async up(): Promise<void> {
    return this.getKnex().schema.hasTable('withdrawal_products').then( (exists) => {
      if (exists) return;
      return this.getKnex().schema // **** udpate
      .createTable('withdrawal_products', async table => {
        table
          .string('serial_number')
          .references('product_instances.serial_number')
          .notNullable();
        table.uuid('withdrawal_id').references('withdrawal.id').notNullable();
        table.primary(['serial_number', 'withdrawal_id']);
        table.timestamp('created_at').defaultTo(this.getKnex().fn.now());
        table.timestamp('updated_at').defaultTo(this.getKnex().fn.now());
        table.timestamp('deleted_at');
      })
    });
  }
  async down():Promise <void> {
    return this.getKnex().schema.dropTable('withdrawal_products');
  }
}
